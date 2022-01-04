/*
 * Node js REPL?
    -> The REPL feature of Node is very useful in experimentimg with Node.js codes and to debug Javascript codes.

Read - Read user's input, parses the input into JavaScript data-structure, and stores in memory.
Eval - Takes and evaluates the data structure.
Print - Print the result.
Loop - Loops the above command until the user presses ctrl-c twice.
 */

/*
    -> if you want to create a runtime environment for the Node js then go to the directory
    -> Press, node
    -> now you runtime environment for that directory is created 
    -> .help to porform instruction for REPL
    -> if you will double click TAB then we can see all the property and the method of the Node js
    -> if you want to know the method of some method then we can do that by:
        ex: write fs in REFL 
            -> then you can see all the function that you can use of that fs
            
*/

/*
* REPL
    1) js Expression
        ->  > 1+2
            2*4
    2) use variables
        ->  > var x=0
            undefined
            > x
            0
    3) Multiline code / loops
        ->  > var x=0
            undefined
            > x
            0
            > do
            ... {
            ... x++
            ... console.log("number is: "+x)
            ... }while(x<10)

    4) use (_) to get the last result
        ->  > 3+5
            8
            > _
            8
            > _+4
            12
    5) we can use editor mode
        ->  >.editor
            // Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)
            const name = (myname) => {console.log(`my name is ${myname}`);}
            name("roman");
            my name is roman
            undefined
*/
