using API.Entities.Models;

namespace API.DTOs
{
    public class UserDto : BaseDto, IMappedDto<User>
    {
        [Required]
        [StringLength(255)]
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
