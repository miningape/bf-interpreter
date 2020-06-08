"use strict";
class BFInterpreter {
    constructor(text, input = [], envSize = 30000, output = console.log) {
        // Convert an integer to its ASCII code
        this.ASCII = function (charCode) { return String.fromCharCode(charCode); };
        // Convert a string to its ASCII number
        this.STRING = function (char) { return char.charCodeAt(0); };
        // Initialization
        this.symbols = text.match(/[\>\<\+\-\[\]\.\,\^]/g); // Get symbols
        this.environment = Array(envSize).fill(0); // Load environment
        this.pointer = 0; // Set data pointer
        this.position = 0; // Set initial position
        this.input = input; // Set input
        this.printfn = output; // Set output function
        // Find all loops
        this.loops = this.findLoops();
    }
    // This runs the code in the object
    interpret() {
        let curToken;
        while (this.position < this.symbols.length) {
            curToken = this.symbols[this.position];
            switch (curToken) {
                case '+': // Increment cell at pointer
                    this.environment[this.pointer]++;
                    break;
                case '-': // Decrement cell at pointer
                    this.environment[this.pointer]--;
                    break;
                case '<': // Shift pointer left
                    this.pointer--;
                    break;
                case '>': // Shift pointer right
                    this.pointer++;
                    break;
                case '[': // Jump to matching ']' if the cell being pointed at is 0
                    if (this.environment[this.pointer] == 0) {
                        let find = this.loops.find(obj => { return obj.from == this.position; });
                        this.position = find.to;
                    }
                    break;
                case ']': // Jump to matching '[' if the cell being pointed at is not 0
                    if (this.environment[this.pointer] != 0) {
                        let find = this.loops.find(obj => { return obj.to == this.position; });
                        this.position = find.from;
                    }
                    break;
                case ',': // Read from input from array from the front
                    let curInput = this.input[0] ? this.input.shift() : Infinity;
                    if (curInput == Infinity)
                        throw ("Asked for Input when none was given");
                    this.environment[this.pointer] = this.STRING(curInput);
                    break;
                case '.': // Write data at the current cell to the terminal
                    this.printfn.call(this, this.ASCII(this.environment[this.pointer]));
                    break;
                case '^': // Breakpoint: Outputs environment
                    this.printfn.call(this, this.environment);
                    this.printfn.call(this, '\n');
                    break;
                // There is somehow an unrecognized symbol
                default: throw ("Unrecognized Symbol");
            }
            this.position++;
        }
    }
    // Calculates where the loops are
    // @return an array containing objects that tell where the loops are
    findLoops() {
        let jumps = [];
        this.symbols.forEach((token, index) => {
            if (token == '[') {
                let jmpTo = this.findMatching(index);
                if (jmpTo < 0)
                    throw ('Bracket at ' + index + ' does not have a pair');
                else
                    jumps.push({ from: index, to: jmpTo });
            }
        });
        return jumps;
    }
    // Finds the matching bracket to the one at the index
    // @param: index of the bracket we are looking for the pair to
    // @return: index of the bracket that is paired to 
    findMatching(from) {
        let count = 0;
        for (let i = from; i < this.symbols.length; i++) {
            if (this.symbols[i] == '[')
                count++;
            if (this.symbols[i] == ']') {
                count--;
                if (count == 0) {
                    return i;
                }
            }
        }
        return -1;
    }
}
