// Function to retrieve user data from localStorage
export const getUserFromLocalStorage = () => 
{
    // Retrieve user data from localStorage
    const user = localStorage.getItem('user');
    try 
    {
        // If 'user' exists, parse the JSON string to an object and return it
        // If 'user' doesn't exist, return null
        return user ? JSON.parse(user) : null;
    } 
    catch (err) 
    {
        console.error("Invalid user JSON:", err);
        // If parsing fails, return null
        return null;
    }
};