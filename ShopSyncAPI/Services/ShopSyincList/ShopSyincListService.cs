using API.DTOs.API.Entities.Models;
using API.Entities.Models;
using API.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class ShoppingListService : IShoppingListService
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;

        public ShoppingListService(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ShoppingListDto?> Get(int id)
        {
            var shoppingList = await _context.ShoppingLists
                .Include(sl => sl.ListItems)
                .FirstOrDefaultAsync(sl => sl.Id == id);

            return _mapper.Map<ShoppingListDto>(shoppingList);
        }

        public async Task<IEnumerable<ShoppingListDto>> GetAll()
        {
            var shoppingLists = await _context.ShoppingLists
                .Include(sl => sl.ListItems)
                .ToListAsync();

            return _mapper.Map<IEnumerable<ShoppingListDto>>(shoppingLists);
        }

        public async Task<ShoppingListDto?> Save(ShoppingListDto shoppingListDto)
        {
            var shoppingList = _mapper.Map<ShoppingList>(shoppingListDto);

            if (shoppingList.Id <= 0)
            {
                await _context.ShoppingLists.AddAsync(shoppingList);
            }
            else
            {
                var existingList = await _context.ShoppingLists
                    .Include(sl => sl.ListItems)
                    .AsTracking()
                    .Where(c => c.Id == shoppingList.Id)
                    .FirstOrDefaultAsync();

                if (existingList == null)
                {
                    return null;
                }

                _context.Entry(existingList).CurrentValues.SetValues(shoppingList);

                foreach (var listItemDto in shoppingListDto.ListItems)
                {
                    var listItem = _mapper.Map<ListItem>(listItemDto);
                    existingList.ListItems.Add(listItem);
                }
            }

            await _context.SaveChangesAsync();

            return _mapper.Map<ShoppingListDto>(shoppingList);
        }

        public async Task<ShoppingListDto?> Delete(int id)
        {
            var shoppingList = await _context.ShoppingLists
                .Include(sl => sl.ListItems)
                .FirstOrDefaultAsync(sl => sl.Id == id);

            if (shoppingList != null)
            {
                _context.ShoppingLists.Remove(shoppingList);
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<ShoppingListDto>(shoppingList);
        }

        public async Task<int> Delete(IEnumerable<int> ids)
        {
            var entityIdsParameter = string.Join(",", ids.ToArray());
            string? tableName = GetTableName<ShoppingList>();

            var deleteSql = $"DELETE FROM {tableName} WHERE ShoppingListId IN ({entityIdsParameter})";

            var affectedRows = await _context.Database.ExecuteSqlRawAsync(deleteSql);

            return affectedRows;
        }

        private static string? GetTableName<T>()
        {
            var entityType = typeof(T);
            var entityAttribute = entityType.GetCustomAttributes(inherit: false).OfType<System.ComponentModel.DataAnnotations.Schema.TableAttribute>().FirstOrDefault();
            return entityAttribute?.Name;
        }
        public async Task<IEnumerable<ShoppingListDto>> GetShoppingListsForUser(int userId)
        {
            var userIdString = userId.ToString();

            var shoppingListsForUser = await _context.ShoppingLists
                .Include(sl => sl.ListItems)
                .ToListAsync();

            var filteredShoppingLists = shoppingListsForUser
                .Where(sl => sl.UserIds.Split(',').Contains(userIdString))
                .ToList();

            return _mapper.Map<IEnumerable<ShoppingListDto>>(shoppingListsForUser);
        }

    }
}
