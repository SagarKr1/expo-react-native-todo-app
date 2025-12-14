import { query, mutation } from './_generated/server';
import { ConvexError,v } from 'convex/values';


export const getTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect();
        return todos;
    }
});

export const addTodos = mutation({
    args:{
        text:v.string()
    },
    handler: async (ctx,args)=>{
        const todosId = await ctx.db.insert("todos",{
            text:args.text,
            isCompleted:false
        })
        return todosId;
    }
});

export const toggleTodos = mutation({
    args:{
        id:v.id("todos")
    },
    handler:async (ctx,args)=>{
        const todos = await ctx.db.get(args.id);
        if(!todos) throw new ConvexError("Todos not found");

        await ctx.db.patch(args.id,{
            isCompleted:!todos.isCompleted
        })
    }
})

export const updateTodos = mutation({
    args:{
        id:v.id("todos"),
        text:v.string()
    },
    handler:async (ctx,args)=>{
        const todos = await ctx.db.get(args.id);
        if(!todos) throw new ConvexError("Todos not found");

        await ctx.db.patch(args.id,{
            text:args.text
        })
    }
})

export const deleteTodos = mutation({
    args:{
        id:v.id("todos")
    },
    handler:async (ctx,args)=>{
        await ctx.db.delete(args.id)
    }
})

export const clearAllTodos = mutation({
    handler:async (ctx)=>{
        const todos = await ctx.db.query("todos").collect();
        for(const todo of todos){
            await ctx.db.delete(todo._id)
        }
    }
})