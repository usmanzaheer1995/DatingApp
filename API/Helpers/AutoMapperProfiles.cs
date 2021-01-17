using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDTO>()
                .ForMember(
                    dst => dst.PhotoUrl,
                    opt => opt.MapFrom(
                        src => src.Photos.FirstOrDefault(x => x.IsMain).Url
                    )
                )
                .ForMember(
                    dst => dst.Age,
                    opt => opt.MapFrom(
                        src => src.DateofBirth.CalculateAge()
                    )
                );
            CreateMap<Photo, PhotoDTO>();
        }
    }
}