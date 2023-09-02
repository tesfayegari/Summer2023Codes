Web Development technologies 
    HTML 
    CSS 
    javaScript (or Typescript)

HTML Class Demo and Notes
 HTML representation of Content 
 
 block and inline elements => div, span 
 Image => img element 
 Link => a element 
 Heading Text => h1, h2... h6 elements 
 Paragraph => p
 Bulletted (Numbers) => ul, li /ol, li
 table => table, tr, td, th tbody
 video => video
 audio =>audio
 new line => br
 horizontal line => hr
 iframe - brings content from another site, example embedding youtube video to a site
 
 
Form HTML elements 
 button => button, input, submit elements shows button on a page 
 text box (single line and multi line )
 dropdowns 
 radio buttons 
 checkbox ....

 for text box, radio button, checkbox, buttons, date and time picker, ...  we use input element 

 CSS 

 How to insert CSS in to html 
 option 1: internal css. use the header section and use style element 
 Option 2: inline style (for specicific element )
 option 3: external css file which has all of the styles and use link element to add to the html 

 Syntax for css is as below

 selector { //selector could be an element name, ID of an element or a class of an emelement 
    property1: value1;
    property2: value2;...
 }

 example 
element selector 
 h3 {
    color: red; //font color
    background-color: blue;
 }

 an id Selector <div id="abc">Some content </div>

 #abc {
    color: red;
 }

 a class property of an element <div class="abc">Some content </div>
 .abc {
    color: red;
 }


 javaScript - Programming language (part of web development which adds behavior to the web page )

   Agenda 
      
      Statment 
      variables (data type) - Data types (number, string, null, undefined, array, object(any))
      Operation (Mathematical and logical)
      conditional statement 
      Repetition/Loop
      Function
      Object Oriented
      Events and handlers 
      excelption handling 


Data types 
 number: example a=5, the type of a is a number
 string: text exaple name="Tesfaye"
 null: empty variable (deallocate the memory) let a = null
 undefined: when variable is declared and not assigned let a;  a is undefined 
 array: collection let students = [] - empty array 
   students = ["Tesfaye", "Meliha", "Sara"]
   to access each value in a collection we have to use index. Index starts from 0 and ends at array length - 1
   studnts[0] is "Tesfaye", students[2] is Sara, studnts[3] is error out of index 
object: or recrod. Exaple let student1 = {name:"Tesfaye", dob: "2003", phone: "333-567-8765"}

array of objects (records)
example students = [
        {
            name: "Tesfaye",
            phone: "444-676-9876"
        },
        {
            name: "Meliha",
            phone: "556-987-5432"
        },
        {
            name: "Sara",
            phone: "987-765-5432"
        }
    ];




   Conditional statement (if else statement)

   Syntax: 
      if (conditionalexpression) {
         //block of code when the expression is true 

      } else {
         //false block statemtns goes here
      }

      multiple if can be nested as below 
      if (expresssion1) {
         //true statemetn 
      }else if (expreesion2){
         //when expression2 is true statements 
      }else if(....){


      } else {

      }

conditional expression: comparison (equality, greater, less ... )

example let a = 4, b= 5

a = b - that equal sign is assignment operator with this statement a=5 and b = 5
conditional operators 
   equality  - ==
   greater  - >
   less  - <
   not equal - !=
   less than or equal - <=
   greater than or equal - >=
   similar - === ( when two variables are equal in value and same in type)

example a == b (is a equal to b?)

Loop or Repetition - widely used looping mechanism is for loop 
   This is widely used when you have arrays (table or collection)

   Syntax of for loop

   for(initialization; condition; expression ) {
      //repeted block 
   }

example repeting from 0 to 10 excluding 1o 
   for( let i = 0; i < 10; i = i + 1){
      console.log('Logging item ', i);
   }

   same above code can be written in simplified foreach statement below 
   for(let st of students){
      console.log('Logging item ', student);
   }

   String interpolation ECMA 6
   let age = 50;name = "Abebe"
   let st = "name : " + name + " Age: " + age

   let st = `name: ${name} age: ${age}`











 REFERENCE 
https://www.w3schools.com/html/
 https://www.w3schools.com/TAGS/default.asp

 


