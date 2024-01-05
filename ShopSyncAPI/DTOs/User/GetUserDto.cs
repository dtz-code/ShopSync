using API.Entities.Models;

namespace API.DTOs
{
    public class GetUserDto : IMappedDto<User>
    {
        public int Id { get; set; }
    }
}
