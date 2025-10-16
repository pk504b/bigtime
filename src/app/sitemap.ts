import { MetadataRoute } from 'next'
import country from "country-list-js";
import { cityMapping } from "city-timezones";

var country_names = country.names();

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bigtime.pw'

  const sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseUrl}/clock`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    ...country_names.map((cntry) => ({
      url: `${baseUrl}/clock/${cntry.replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    })),
    ...cityMapping.map((city) => ({
      url: `${baseUrl}/clock/${city.city.replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/timer`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stopwatch`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pomodoro`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.9,
    },
  ]
  
  return sitemap 
}