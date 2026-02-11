import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

/**
 * Maps storage keys to their paths in the images.ts config object
 */
const getConfigPath = (storageKey: string): string[] => {
  const key = storageKey.toLowerCase()
  
  // News section
  if (key.startsWith('news_')) {
    const articleKey = key.replace('news_', '')
    return ['news', articleKey]
  }
  
  // Impact stories
  if (key.startsWith('impact_')) {
    const impactKey = key.replace('impact_', '')
    const mapping: { [key: string]: string } = {
      'welcome': 'welcome',
      'orphanagesupport': 'orphanageSupport',
      'educationprogram': 'educationProgram',
      'communityimpact': 'communityImpact'
    }
    return ['impactStories', mapping[impactKey] || impactKey]
  }
  
  // Programs
  if (key.startsWith('programs_')) {
    const programKey = key.replace('programs_', '').replace('_image_url', '')
    const mapping: { [key: string]: string } = {
      'education': 'education',
      'healthcare': 'healthcare',
      'economic': 'economic',
      'orphans': 'orphans',
      'rights': 'rights',
      'emergency': 'emergency'
    }
    return ['programs', mapping[programKey] || programKey]
  }
  
  // Our Work
  if (key.startsWith('our_work_')) {
    const workKey = key.replace('our_work_', '').replace('_image_url', '').replace('_gallery', '')
    const mapping: { [key: string]: string } = {
      'menstrualhygiene': 'menstrualHygiene',
      'languageskills': 'languageSkills',
      'orphansupport': 'orphanSupport',
      'scholarshipmentorship': 'scholarshipMentorship',
      'artclub': 'artClub',
      'healthsupport': 'healthSupport'
    }
    const mappedKey = mapping[workKey] || workKey
    return key.includes('_gallery') ? ['ourWorkGallery', mappedKey] : ['ourWork', mappedKey]
  }
  
  // Hero section
  if (key.startsWith('hero_')) {
    const heroKey = key.replace('hero_', '')
    return ['hero', heroKey.includes('background') || heroKey.includes('video') ? 'background' : 'main']
  }
  
  // Videos section
  if (key.startsWith('videos_') || key.includes('video')) {
    return ['videos', 'featured']
  }
  
  // Testimonials/Success stories
  if (key.includes('success_story') || key.includes('testimonial')) {
    // Handle videos for Success Stories (e.g., success_story_video1, success_story_video2)
    if (key.includes('video')) {
      const videoMatch = key.match(/video(\d+)/)
      if (videoMatch) {
        return ['testimonials', `video${videoMatch[1]}`]
      }
      // Fallback: if just 'video' without number, default to video1
      return ['testimonials', 'video1']
    }
    
    // Handle images for Success Stories
    const personKey = key.replace('success_story_', '').replace('_image', '')
    const mapping: { [key: string]: string } = {
      'barin': 'person1',
      'wasiya': 'person2',
      'moheba': 'person3',
      'ozra': 'person4'
    }
    return ['testimonials', mapping[personKey] || personKey]
  }
  
  // Feedback videos (same as Success Stories videos)
  if (key.includes('feedback') && (key.includes('video') || key.includes('_video'))) {
    const videoMatch = key.match(/video(\d+)/)
    if (videoMatch) {
      return ['testimonials', `video${videoMatch[1]}`]
    }
    return ['testimonials', 'video1']
  }
  
  // Team members
  if (key.startsWith('team_')) {
    return ['about', 'team', key.replace('team_', '').replace('_', '')]
  }
  
  // Home media gallery
  if (key.includes('home_media_gallery') || (key.includes('home') && key.includes('gallery'))) {
    return ['homeGallery']
  }
  
  // Regular gallery sections
  if (key.includes('gallery') && !key.includes('our_work') && !key.includes('home')) {
    return ['gallery', 'community']
  }
  
  return []
}

/**
 * Updates the images.ts config file with a new media URL
 */
export async function updateImagesConfig(
  storageKey: string,
  fileUrl: string,
  isGallery: boolean = false
): Promise<{ success: boolean; message: string }> {
  try {
    const configPath = join(process.cwd(), 'src', 'config', 'images.ts')
    let fileContent = await readFile(configPath, 'utf-8')
    
    const configPathArray = getConfigPath(storageKey)
    
    if (configPathArray.length === 0) {
      console.warn(`Could not determine config path for storageKey: ${storageKey}`)
      return { success: false, message: `Could not determine config path for: ${storageKey}` }
    }
    
    const isArray = isGallery || storageKey.includes('_gallery') || storageKey.includes('gallery')
    const targetKey = configPathArray[configPathArray.length - 1]
    
    if (isArray) {
      // Handle array updates (galleries)
      // Find the array property using regex
      const arrayRegex = new RegExp(
        `(${targetKey}:\\s*\\[)([^\\]]*)(\\])`,
        's'
      )
      
      const match = fileContent.match(arrayRegex)
      if (match) {
        // Array exists, add to it
        const existingContent = match[2].trim()
        const newItem = `"${fileUrl}"`
        const updatedContent = existingContent 
          ? `${existingContent},\n      ${newItem}`
          : newItem
        
        fileContent = fileContent.replace(arrayRegex, `$1${updatedContent}$3`)
      } else {
        // Array doesn't exist, try to create it
        // Find the parent object
        const parentKey = configPathArray.length > 1 ? configPathArray[configPathArray.length - 2] : null
        
        if (parentKey) {
          // Find parent object and add array inside it
          const parentRegex = new RegExp(
            `(${parentKey}:\\s*\\{)([^}]*)(\\})`,
            's'
          )
          
          const parentMatch = fileContent.match(parentRegex)
          if (parentMatch) {
            const indent = '    '.repeat(configPathArray.length - 1)
            const newArray = `${parentMatch[2]},\n${indent}${targetKey}: [\n${indent}  "${fileUrl}"\n${indent}]`
            fileContent = fileContent.replace(parentRegex, `$1${newArray}$3`)
          } else {
            return { success: false, message: `Could not find parent object: ${parentKey}` }
          }
        } else {
          return { success: false, message: `Could not create array: ${targetKey}` }
        }
      }
    } else {
      // Handle single value updates
      // Build regex to find the property (handles nested objects)
      let propertyRegex: RegExp
      
      if (configPathArray.length === 1) {
        // Top-level property
        propertyRegex = new RegExp(`(\\s*${targetKey}:\\s*)"[^"]*"`, 's')
      } else {
        // Nested property - find within parent object
        const parentKey = configPathArray[configPathArray.length - 2]
        propertyRegex = new RegExp(
          `(${parentKey}:\\s*\\{[^}]*?\\s*${targetKey}:\\s*)"[^"]*"`,
          's'
        )
      }
      
      const match = fileContent.match(propertyRegex)
      if (match) {
        // Property exists, replace it
        fileContent = fileContent.replace(propertyRegex, `$1"${fileUrl}"`)
      } else {
        // Property doesn't exist, try to add it
        if (configPathArray.length > 1) {
          const parentKey = configPathArray[configPathArray.length - 2]
          const parentRegex = new RegExp(
            `(${parentKey}:\\s*\\{)([^}]*)(\\})`,
            's'
          )
          
          const parentMatch = fileContent.match(parentRegex)
          if (parentMatch) {
            const indent = '    '.repeat(configPathArray.length - 1)
            const newProperty = `${parentMatch[2]},\n${indent}${targetKey}: "${fileUrl}"`
            fileContent = fileContent.replace(parentRegex, `$1${newProperty}$3`)
          } else {
            return { success: false, message: `Could not find parent to add property: ${parentKey}` }
          }
        } else {
          return { success: false, message: `Could not find or create property: ${targetKey}` }
        }
      }
    }
    
    // Write the updated content back to the file
    await writeFile(configPath, fileContent, 'utf-8')
    
    return { 
      success: true, 
      message: `Successfully updated images.ts at ${configPathArray.join('.')}` 
    }
  } catch (error) {
    console.error('Error updating images config:', error)
    return { 
      success: false, 
      message: `Failed to update images.ts: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}
