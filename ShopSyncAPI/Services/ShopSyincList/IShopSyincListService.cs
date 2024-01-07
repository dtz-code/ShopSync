using API.DTOs.API.Entities.Models;

namespace API.Services
{
    public interface IShoppingListService : IApplicationService
    {
        Task<ShoppingListDto?> Get(int id);
        Task<IEnumerable<ShoppingListDto>> GetAll();
        Task<ShoppingListDto?> Save(ShoppingListDto shoppingListDto);
        Task<ShoppingListDto?> Delete(int id);
        Task<int> Delete(IEnumerable<int> ids);
        Task<IEnumerable<ShoppingListDto>> GetShoppingListsForUser(int userId);
    }
}
