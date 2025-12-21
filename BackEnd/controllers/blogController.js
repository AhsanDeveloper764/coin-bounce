const Joi =  require("joi");
const fs = require('fs');
const blog = require("../models/blog");
const comment = require("../models/comment");
const BlogDetails = require("../dto/blog-details");
const BlogDto = require("../dto/blog");
const {BACKEND_SERVER_PATH} = require('../config/index');
const mongodbIdPattern = /^[a-fA-F0-9]{24}$/

// login say jo id mili hay wo blog ka author hoga
const blogController = {
    async create(req,resp,next){
        // validate req body
        // handle Photo Storage Naming
        // add to db
        // return responce  
        // photo hmari client side say ahagee base64 kee form ma string ma encodeed hokar -> isko hum apnay backned ma decode 
        // kreingay -> or databse mai store kraingay       

        const createBlogSchmea = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string().required()
        })

        // validate kra hay 
        const {error} = createBlogSchmea.validate(req.body);
        if(error){
            return next(error);
        }
        const {title,author,content,photo} = req.body;
        // photo ko handle krna hay
        // read as buffer
        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/,""),"base64") // img kee encoding base64 type kee hay 
        // allot a random name
        const imgPath = `${Date.now()}-${author}.png`
        // save locally
        try {
            fs.writeFileSync(`storage/${imgPath}`, buffer)    
        }
        catch(error){
            return next(error)
        }
        // save blog in databse
        let newBlog;
        try{
            newBlog = new blog({
                title,
                author,
                content,
                photoPath: `${BACKEND_SERVER_PATH}/storage/${imgPath}`
            })
            await newBlog.save() 
        }catch(error){
            return next(error)
        }
        const blogdto = new BlogDto(newBlog);
        return resp.status(201).json({blog:blogdto})

    },
    async getAll(req,resp,next){
        try{
            const Blogs = await blog.find({})
            const blogDTO = []
            for(let i=0; i<Blogs.length; i++){
                const blogs = new BlogDto(Blogs[i])
                blogDTO.push(blogs)
            }
            return resp.status(201).json({blogs:blogDTO})
        }catch(error){
            return next(error)
        }   
    },
    async getById(req,resp,next){
        // validate ID
        // Respponce
        const getIDSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        })

        // joi say validate kra hay
        const {error} = getIDSchema.validate(req.params)
        if(error){
            return next(error)
        }

        let Blog;
        const {id} = req.params;
        try{
            Blog = await blog.findOne({_id:id}).populate("author");
        }
        catch(error){
            return next(error)
        }

        const BLOGDTO = new BlogDetails(Blog)
        return resp.status(201).json({data:BLOGDTO})
    },
    async update(req, resp, next) {
    const updateBlogSchema = Joi.object({
        title: Joi.string(),
        content: Joi.string(),
        author: Joi.string().regex(mongodbIdPattern),
        blogId: Joi.string().regex(mongodbIdPattern).required(),
        photo: Joi.string(),
    });

    const { error } = updateBlogSchema.validate(req.body);
    if (error) {
        return next(error);
    }

    const { title, content, author, blogId, photo } = req.body;
    let Blog;
    try {
        Blog = await blog.findOne({ _id: blogId });
    } catch (error) {
        return next(error);
    }

    if (!Blog) {
        return resp.status(404).json({ message: "Blog not found" });
    }

    if (photo) {
        let previousPhoto = Blog.photoPath; 
        previousPhoto = previousPhoto.split("/").at(-1);

        // delete photo
        fs.unlinkSync(`storage/${previousPhoto}`);

        // handle new photo
        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), "base64");

        const imgPath = `${Date.now()}-${author}.png`;

        try {
            fs.writeFileSync(`storage/${imgPath}`, buffer);
        } catch (error) {
            return next(error);
        }

        await blog.updateOne(
            { _id: blogId },
            { title, content, photoPath: `${BACKEND_SERVER_PATH}/storage/${imgPath}` },
        );
    } else {
        await blog.updateOne({ _id: blogId }, { title, content });
    }

    return resp.status(201).json({ message: "Blog Updated!" });
    },
    async delete(req,resp,next){
        // validate ID
        // delete Blog
        // delete Comments on this blog
        const deleteBlogSchema = Joi.object({
            id:Joi.string().regex(mongodbIdPattern).required()
        })

        const {error} = deleteBlogSchema.validate(req.params);
        if(error){
            return next(error)
        }
        const {id} = req.params;
        try{
            await blog.deleteOne({_id:id})
            await comment.deleteMany({blog:id})
        }catch(error){
            return next(error)
        }

        return resp.status(201).json({message:"Blog Deleted"})
    }
}
module.exports = blogController