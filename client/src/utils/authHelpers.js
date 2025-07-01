export const getUserFromLocalStorage = () => 
{
    const user = localStorage.getItem('user');
    try 
    {
        return user ? JSON.parse(user) : null;
    } 
    catch (err) 
    {
        console.error("Invalid user JSON:", err);
        return null;
    }
};