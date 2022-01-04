/*
    -> in a global npm module we can ba able to access all the module globally we don't event have to install it on root path
    -> previous we install local module
    -> we can get the module like a  modemon in global :
        -> nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

    -> to install "Nodemon" module in global we have to write this:
        -> npm install -g nodemon

    -> to check whether the module get install of not we can do this:
        -> nodemon -v

    -> if you will get error like:
        -> nodemon : File C:\Users\Razz Roman\AppData\Roaming\npm\nodemon.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at 
        https:/go.microsoft.com/fwlink/?LinkID=135170.
        At line:1 char:1
        + nodemon -version
        + ~~~~~~~
            + CategoryInfo          : SecurityError: (:) [], PSSecurityException
            + FullyQualifiedErrorId : UnauthorizedAccess
    -> then you have to do the the directory called:
        -> C:\Users\Razz Roman\AppData\Roaming\npm\nodemon.ps1
        -> and delete 'nodemon.ps1'
    -> and after that you can run the nodemon by:
        -> in a root folder where you are working:
        -> nodemon .\index.js
    -> to exit (ctrl + c)
*/

console.log("Hellow world!");
