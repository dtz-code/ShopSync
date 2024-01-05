namespace API.DTOs
{
    namespace API.Entities.Models
    {
        public class ListItemDto : BaseDto, IMappedDto<ListItem>
        { 
            public string Name { get; set; }
            public bool Checked { get; set; }
            public int Quantity { get; set; }
            public int ShoppingListId { get; set; }
        }

    }

}
