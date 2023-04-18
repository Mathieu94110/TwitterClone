import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Commentaire',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'profileImg',
      title: 'Image de profil',
      type: 'string',
    }),
    defineField({
      name: 'tweet',
      title: 'Tweet',
      description: 'Reference à quel commentaire le tweet est associé:',
      type: 'reference',
      to: {type: 'tweet'},
    }),
  ],
})
