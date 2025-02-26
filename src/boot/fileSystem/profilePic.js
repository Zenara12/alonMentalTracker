import { Filesystem, Directory } from '@capacitor/filesystem'

const STORAGE_KEY = 'profilePic' // Key for LocalStorage

export async function saveFile(file) {
  if (!file) return

  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const base64Data = event.target.result.split(',')[1] // Extract base64 data
        const fileName = `${Date.now()}_${file.name}`

        // Save file to filesystem
        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Data,
        })

        // Save file metadata in LocalStorage
        const savedFiles = { name: file.name, path: fileName, type: file.type }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFiles))

        resolve(fileName)
      } catch (error) {
        console.error('Error saving file:', error)
        reject(error)
      }
    }

    reader.readAsDataURL(file)
  })
}

export async function getFiles() {
  const savedFiles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') // ✅ FIX: Default to empty array if null
  let image = { name: '', path: '', url: null }

  if (savedFiles.length != 0) {
    try {
      const readFile = await Filesystem.readFile({
        path: savedFiles.path,
        directory: Directory.Data,
      })

      const imageUrl = `data:image/jpeg;base64,${readFile.data}` // Convert Base64 to URL
      image = { name: savedFiles.name, path: savedFiles.path, url: imageUrl }
    } catch (error) {
      console.error('Error reading image:', error)
    }
  }

  return image
}

export async function deleteFile(fileName) {
  try {
    await Filesystem.deleteFile({
      path: fileName,
      directory: Directory.Data,
    })

    // Remove from LocalStorage
    let savedFiles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    savedFiles = savedFiles.filter((file) => file.path !== fileName)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFiles))

    return true
  } catch (error) {
    console.error('Error deleting file:', error)
    return false
  }
}
