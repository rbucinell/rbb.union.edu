/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Course {
    id:string,// ID of the course
    name:string, // name of the course,
}

interface Page {
    category:string, //category in nav
    name:string,     //Name of the page
    path:string,     //URL path for the give page
}

interface CoursePage {
    course:Course,
    page:Page,
    created:string,
    images:string[],
    slug:string,
    nav:ManifestSection[]
}

interface ManifestPage {
    name:string,
    url:string,
    externalLink:boolean
}
interface ManifestSection {
    name:string,
    pages:ManifestPage[]
}
interface CourseManifest {
    id:string,
    name:string,
    created:string,
    sections:ManifestSection[]
}