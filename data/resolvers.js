const { User, Categoria, Servidor } = require('./models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose');
const express = require('express')

const resolvers = {
    Query: {
        getUsers: async () => await User.find({}).exec(),

        async me (_, args, { user }) {
        // make sure user is logged in
        try {
            if (!user) {
                new throw Error('You are not authenticated!')
                }

                // user is authenticated
                return await User.findById(user.id)
        } catch (error) {
            return error.message;
        }

        },


        /*getCategorias: async () => await Categoria.
        find({}).populate('servidores').exec(function(err, categoria){
            if (err){
                return handleError(err);
            }
            console.log(categoria.servidor)
        }),*/

    },
    Mutation: {

        async signup (_, { username, email, password, nombre, apellidos, telefono, fecha_nacimiento }) {

        try {
            const user = await User.create({
                username,
                email,
                nombre,
                apellidos,
                telefono,
                fecha_nacimiento,
                password: await bcrypt.hash(password, 10)
                })




                return user

        } catch (error) {
            return error.message
        }

           // return json web token
         /*jsonwebtoken.sign(
        { id: user.id, email: user.email },
        'somesuperdupersecret',
        { expiresIn: '1y' }
        )*/},
        async login (_, { email, password }) {
        const user = await User.findOne({email: email}) //User.findOne({ where: { email } })


        if (!user) {
            throw new Error('No user with that email')
            }

            const valid = await bcrypt.compare(password, user.password)

            if (!valid) {
            throw new Error('Incorrect password')
            }
        

            var profile = {
                id: user.id,
                email: user.email,
              };

            token = jsonwebtoken.sign(
            profile,
            'somesuperdupersecret',
            { expiresIn: '1d' }
            )
            // return json web token

            return {
                user,
                token
            };


        },
        /*delete_user: async (_, args) => {
            try{
                const user = await User.findOne({username:args.username})
                if(!user){
                    throw new Error("Username doesn't exist")
                }
                let response = await User.deleteOne({username:args.username});
                return "Objecto eliminado correctamente: "+response;

            }catch(e){
                return e.message;
            }
        }*/





    }
};

module.exports = resolvers
