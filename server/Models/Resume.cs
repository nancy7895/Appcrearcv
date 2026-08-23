namespace AppCv.Server.Models;

public class Resume
{
public string Id {get;set;}= Guid.NewGuid().ToString();
public string Title {get;set;} ="Mi curriculum";
public string LastModified {get;set;}= DateTime.UtcNow.Tosttring("o");
public string TemplateId {get;set;}="modern-aura";
public string AccentColor {get;set;}= "#6366f1";
public string FontFamily { get; set; } = "Plus Jakarta Sans";
public string Densit {get;set;}="normal";

public PersonalInfo PersonalInfo {get;set;} = new PersonalInfo();
public List<ExperienceItem> Experience {get;set;}=new List<ExperienceItem>();
public List<EducationItem> Education {get;set;}=new List<EducationItem>();
public List<SkillItem> Skills {get;set;} =new List<SkillItem>();

}