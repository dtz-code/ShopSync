using API.Entities.Models;

namespace API.Entities
{
    public class ListItem: BaseModel
    {
        public required int ListItemId { get; set; }
        public required string Name { get; set; }
        public int Quantity { get; set; }
        public bool Checked { get; set; }
        public int ShoppingListId { get; set; } 
    }
}
