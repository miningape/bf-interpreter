# Brainfvck Interpreter written in TypeScript

Brainfuck, also known as bf, is a minimalistic esoteric programming language, it uses a cell memory structure, as well as only 8 commands.
It's primarily used as challenge programming language. The interpretation of this language fairly simple, and I've recently gotten very
interested in interpreter and compiler design.


This is a "pre-project" for me, I'll be using it to support an online BrainFuck text editor/interpreter I'm working on. 
There is a basic brainfuck tutorial as well as a usage guide in this README.

# Usage

Currently there is no "easy" way to view/edit the final project.
But it can be run by downloading all the files and running the "greeter.html" file, 
then opening the developer teminal inside the browser you are using. Then running the following
commands:

```javascript
let bf = new BFInterpreter(/*code as a string*/);
bf.interpret();
```
And this is some example code to run
```brainfuck
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
```

Input is passed in as an array after the code string, and it is read in order.
In this case input will be the character "a" followed by "b". Every time input is 
asked for it uses the front of the array and then removes it.

```javascript
let bf = new BFInterpreter(/*code as a string*/, ["a", "b"]);
bf.interpret();
```

# Brainfuck tutorial

Brainfuck only has 8 commands, these are
```brainfuck
+  -  <  >  [  ]  .  and  ,
```

The memory in Brainfuck looks like this:
```brainfuck
[0][0][0][0][0]...
 ^
```
It is normally initialized with 30000 cells but this can be increased with the 3rd parameter of the class initialization.
The "^" is the memory pointer. The memory pointer always begins at cell 0.

Its possible to alter the position of the pointer with the "<" and ">" operators, that move it left and right respectively.

The "+" and "-" operations increment or decement the value within the cell that is currently being pointed to.

This means that the program "+>++>+++" results in:
```brainfuck
[1][2][3][0][0]...
       ^
```

The "[" and "]" form a "loop", that is to say that when the program encounters a "[" it checks whether the cell it is currently
pointing to has a value of 0, if it does it jumps to the corresponding "]" otherwise it executes the code within the brackets.
The "]" operator checks the current value of the cell being pointed at, if it is not 0 it jumps back to the corresponding "[", 
otherwise it continues on to the next command in the sequence.

This means that the program "++[>++<-]" results in:
```brainfuck
[0][4][0][0][0]...
 ^
```

"," accepts input, and puts the ASCII index of the character into the current cell. "." Writes the ASCII value of the 
current cell into the terminal.

That being said, this program outputs "Hello World!"
```brainfuck
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
```

More can be learned on [wikipedia](https://en.wikipedia.org/wiki/Brainfuck) or [here](https://esolangs.org/wiki/Brainfuck)



