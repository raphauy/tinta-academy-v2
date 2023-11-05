import getSession, { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { FormValues } from "./actions";
import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);


export async function getTeacherCourses() {
  const currentUser= await getCurrentUser()
  if (!currentUser) throw new Error(`User not found`)
  if (currentUser.role !== 'admin' && currentUser.role !== 'teacher') throw new Error(`User has no permission`)
  
  const found = await prisma.course.findMany({
    where: {
      userId: currentUser.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: true
    }
  })

  return found;
}

export async function getAllCourses() {
  const found = await prisma.course.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true
        },
        orderBy: {
          position: 'asc'
        },
      },
    }
  })

  return found;
}

export async function getCourse(id: string) {

  const found = await prisma.course.findUnique({
    where: {
      id
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc'
        },
      },
      attachments: {
        orderBy: {
          createdAt: 'asc'
        },
      },
      category: true      
    }
  })

  return found
}

export async function getPublishedCourse(id: string) {
  
    const found = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc"
          }
        }
      }
    });
    
    return found  
}

export async function getUserProgressCourse(userId: string, courseId: string) {
  const found = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  return found
  
}

export async function getPreviewProgressCourse(courseId: string) {
  const found = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: "",
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  return found
  
}

export async function create(title: string) {

  const session= await getSession()
  if (!session) throw new Error(`Session not found`)

  const user= session.user
  
  const created= await prisma.course.create({
    data: {
      title,
      userId: user.id
    },
  })

  return created
}

export async function update(id: string, data: FormValues) {
  console.log(data);
  
  const updated= await prisma.course.update({
    where: {
      id
    },
    data,
  })

  return updated
}

export async function eliminate(id: string) {
  
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      chapters: {
        include: {
          muxData: true,
        }
      }
    }
  });

  if (!course) {
    throw new Error("Curso no encontrado")
  }

  for (const chapter of course.chapters) {
    if (chapter.muxData?.assetId) {
      //const video= await Video.Assets.get(chapter.muxData.assetId)
      const info= await Video.Assets.inputInfo(chapter.muxData.assetId)
      console.log("info");
      
      console.log(info);
      
      if (info)
        await Video.Assets.del(chapter.muxData.assetId);
    }
  }

  const deleted= await prisma.course.delete({
    where: {
      id
    },
  })

  return deleted
}

export async function publish(id: string) {
  
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      chapters: {
        include: {
          muxData: true,
        }
      }
    }
  })

  if (!course) {
    throw new Error("Curso no encontrado")
  }

  const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

  if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
    throw new Error("Para publicar un curso, debe tener un título, descripción, imagen, categoría y al menos un capítulo publicado")
  }

  const published = await prisma.course.update({
    where: {
      id,
    },
    data: {
      isPublished: true,
    }
  });

  return published
}

export async function unpublish(id: string) {
  
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    throw new Error("Curso no encontrado")
  }

  const unpublished = await prisma.course.update({
    where: {
      id,
    },
    data: {
      isPublished: false,
    }
  });

  return unpublished
}

export async function enroll(courseId: string) {

  const currentUser= await getCurrentUser()
  if (!currentUser) throw new Error(`Para inscribirte tienes que estar logueado`)

  const userId= currentUser.id

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    }
  })
  if (!course) {
    throw new Error("Curso no encontrado")
  }

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId
      }
    }
  })
  if (purchase) {
    throw new Error("Ya estas inscripto a este curso")
  }

  const enrolled = await prisma.purchase.create({
    data: {
      userId,
      courseId,
    }
  })

  return enrolled
}

/**
 * Attachments
 */

// create attachment
export async function createAttachment(courseId: string, url: string) {
  const session= await getSession()
  if (!session) throw new Error(`Session not found`)

  const user= session.user

  const courseOwner = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: user.id
    }
  });

  if (!courseOwner) {
    throw new Error("Sin autorización para realizar esta acción")
  }

  console.log(url)
  
  const name= url.split("/").pop()
  if (!name) throw new Error(`Invalid url: ${url}`)

  const created= await prisma.attachment.create({
    data: {
      url,
      name,
      course: {
        connect: {
          id: courseId
        }
      }
    },
  })

  return created
}

//delete attachment
export async function deleteAttachment(id: string) {
  const session= await getSession()
  if (!session) throw new Error(`Session not found`)

  const user= session.user

  const attachment = await prisma.attachment.findUnique({
    where: {
      id,
    },
    include: {
      course: {
        select: {
          userId: true
        }
      }
    }
  })
  const courseOwner = attachment?.course.userId === user.id

  if (!courseOwner) {
    throw new Error("Sin autorización para realizar esta acción")
  }

  const deleted= await prisma.attachment.delete({
    where: {
      id
    },
  })

  return deleted
}