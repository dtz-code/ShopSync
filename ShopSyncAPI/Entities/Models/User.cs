namespace API.Entities.Models
{
    public class User: BaseModel
    { 
        public string Username { get; set; }
        public string Password { get; set; }
        public List<ShoppingList> ShoppingLists { get; set; } 
    }
}
