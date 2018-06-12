const RAM = require('./ram');
const CPU = require('./cpu');
const fs = require('fs');
/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory() {

    // Hardcoded program to print the number 8 on the console

    const program = [ // print8.ls8
        "10011001", // LDI R0,8  Store 8 into R0
        "00000000",
        "00001000",
        "01000011", // PRN R0    Print the value in R0
        "00000000",
        "00000001"  // HLT       Halt and quit
    ];

    // Load the program into the CPU's memory a byte at a time
    for (let i = 0; i < program.length; i++) {
        cpu.poke(i, parseInt(program[i], 2));
    }
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

// TODO: get name of ls8 file to load from command line

const argv = process.argv.slice(2);

if (argv.length != 1) {
    console.error("usage: filename capacity");
    process.exit(1);
}

const filename = argv[0];
const filedata = fs.readFileSync(filename, "utf8");
const lines = filedata.trim().split(/[\r\n]+/g);

lines.forEach((bin, idx) => {
    if (idx) cpu.poke(idx, parseInt(bin.split(' ')[0], 2));
});

// loadMemory(cpu);

cpu.startClock();