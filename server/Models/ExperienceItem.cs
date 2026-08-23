namespace AppCv.Server.Models;

public class ExperienceItem
{
    public string Id {get; set;} = string.Empty;
    public string Role {get; set; } = string.Empty;
    public string Company {get; set;} = string.Empty;
    public string Location {get; set;} = string.Empty;
    public string StarDate {get; set;}= string.Empty;
    public string EndDate {get;set;} = string.Empty;
    public bool current {get; set;} = false;
    public string Description {get; set;} =string.Empty;
}
