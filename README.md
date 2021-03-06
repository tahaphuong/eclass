# eclass demo.

Hello everyoneeeee
Introduction: This is a project I made with some other friends, after we finished a web development course.
I'm responsible for the whole UI and some other functions (add homework, count the hearts,...).
link demo: https://homework-management-2377f.web.app
Demo account: 
Teacher: phuonghata1995@gmail.com - 123456
Student: fff@hotmail.com - 123456

<img src="./public/img/demo.png" width="600px"/>

## First words: 

1. This project definitely contains some (or maybe lots of) bugs. Please be gentle with it.

2. The UI and the code logics in here are some kind of "beginner". So I would be really glad to recieve some comments from you guys, im order to improve this web app. (It is 'beginner' because it was first created on October, which means 3 months after I started wrting my first lines of codes :v)

## Functions: 
So there are 2 roles, students and teachers. We had not enough time to handle the class management for 'teacher role', so we decided to hard-coded the database for the classes. Each class has **1 teacher** and **multiple students**.

There's an interesting function: If the students didn't finish the homework before deadline, he/she would **lose 1 heart**. Each student has **3 hearts** at the time he/she enters the class.

### Teacher - has only 1 class
1. Add new homework + set deadline
2. View and evaluate ALL submissions of the students in class. The total points of each student is the sum of her/his all evaluation grades from the teacher.
3. View the grades and the remaining lives of the students.

### Student - can join more than 1 class.
1. Can add submission **before deadline**.
2. View and evaluate ONLY her/his submission. The total points of each student is the sum of her/his all evaluation grades from the teacher.
3. View the grades and the remaining lives of other students.
4. Join more classes by enter the teacher's email.

## Setup:
Here are the steps for you to set up this project after cloning it to local.

### Create database in firestore.
Check the first steps creating Cloud Firestore [here](https://firebase.google.com/docs/firestore/quickstart).

1. Create 2 collections: 'classdemo' and 'studentdemo'.
2. Add a few users to your firebase auth. These are the teachers. 
3. Create a database like this: (the 'homework' field is a **sub-collection**)

<img src="./img/eclassdb.png" width="600px">

### Get the config
1. Get the config of your project and paste it in a file name **configKeys.js** (put this file in the same level as the index.js)
2. If you still could not set up, just check the console.log. Google has developed a really good devtool for all of us. (or [send me an email](tahaphuongz@gmail.com))

### Running local
Basically that is!! Run the file index.html and all done!!

## Thank you for visiting!
My name is Phuong Ta, a newbie coder coming from Vietnam, started coding in July 2019. I'm currently looking for the chance to improve my skills as well as get more experience working on real projects.