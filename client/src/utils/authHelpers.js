export const getUserFromLocalStorage = () => 
{
    try 
    {
        return JSON.parse(localStorage.getItem('user') || 'null');
    } 
    catch (err) 
    {
        console.error("Invalid user JSON:", err);
        return null;
    }
};