namespace API.DTOs
{
    namespace API.Entities.Models
    {
        public class ShoppingListDto : BaseDto, IMappedDto<ShoppingList>
        {
            public required string Title { get; set; }
            public int UserId { get; set; }
            public List<ListItemDto>? ListItems { get; set; } 
        }
    }

}
