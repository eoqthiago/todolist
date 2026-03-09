"use server"
import prisma from "@/lib/prisma";

export const getTodos = async () => {
  return await prisma.todo.findMany();
};

export async function createTodo(text: string, completed: boolean) {
    return await prisma.todo.create({
        data: {
            text: text,
            completed: completed,
        }
    })
}

export async function checkTodo(id: number, completed: boolean) {
    return await prisma.todo.update({
        where: { id },
        data: { completed },
    })
}

export async function deleteTodo(id: number) {
    return await prisma.todo.delete({
        where: { id },
    })
}

export async function listarTarefas() {
    return await prisma.todo.findMany();
}
    
