const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to  MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
    // .populate('author', 'name -_id')
    // .select('name author');
  console.log(courses);  
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('60d9dab2d0e11e58208e363b','60d9df2fc05d3a4c70b71d00');


//addAuthor('60d9dab2d0e11e58208e363b', new Author({ name: 'Amy' }));

// async function updateAuthor(courseId) {
//   await Course.updateOne({ _id: courseID }, {
//     $set: {
//       'author': ''
//     }
//   });
// }

//updateAuthor('60d9ab050eaf193308278ed3');

//createCourse('Node Course', [
//  new Author({ name : 'Mosh'}),
//  new Author({ name: 'John' })
//]);

//listCourses();