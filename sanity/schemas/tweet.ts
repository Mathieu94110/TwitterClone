import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Texte du tweet',
      type: 'string',
    }),
    defineField({
      name: 'blockTweet',
      title: 'Block tweet',
      description: 'Controle administrateur: Utiliser si un tweet est inapproprié',
      type: 'boolean',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image du tweet',
      type: 'string',
    }),
  ],
})
