using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IUserService : IApplicationService
    {
        Task<UserDto?> Get(int id);
        Task<IEnumerable<UserDto>> GetAll();
        Task<UserDto?> Save(UserDto userDto);
        Task<IEnumerable<UserDto>> Save(IEnumerable<UserDto> usersDto);
        Task<UserDto?> Delete(int id);
        Task<int> Delete(IEnumerable<int> ids);
        Task<int> LogIn(UserDto userDto);
    }
}
