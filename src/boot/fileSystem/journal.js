import { Filesystem, Directory } from '@capacitor/filesystem'

const STORAGE_KEY = 'profilePic' // Key for LocalStorage

export async function saveFile(file) {
  if (!file) return

  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        // Get the full data URL
        const fullDataUrl = event.target.result
        // Split to get MIME type and base64 data
        const [mimeTypeData, base64Data] = fullDataUrl.split(',')
        const mimeType = mimeTypeData.match(/:(.*?);/)[1]
        const fileName = `${Date.now()}_${file.name}`

        // Save file to filesystem
        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Data,
        })
        // Save file metadata in LocalStorage
        const savedFiles = { name: file.name, path: fileName, type: file.type || mimeType }

        resolve(savedFiles)
      } catch (error) {
        console.error('Error saving file:', error)
        reject(error)
      }
    }

    reader.readAsDataURL(file)
  })
}

export async function getFiles(file) {
  const savedFiles = file // ✅ FIX: Default to empty array if null
  let fileType = savedFiles.type.split('/')[0]
  try {
    let media = { name: '', path: '', url: null }
    const readFile = await Filesystem.readFile({
      path: savedFiles.path,
      directory: Directory.Data,
    })

    if (fileType === 'video') {
      // Convert base64 to Blob for videos
      const byteCharacters = atob(readFile.data)
      const byteNumbers = new Array(byteCharacters.length)

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: savedFiles.type })

      // Create blob URL
      const blobUrl = URL.createObjectURL(blob)
      media = {
        name: savedFiles.name,
        path: savedFiles.path,
        url: blobUrl,
        type: fileType,
        returnData: { ...savedFiles },
      }
    } else {
      // Handle images as before with data URL
      const fileUrl = `data:${savedFiles.type};base64,${readFile.data}`
      media = {
        name: savedFiles.name,
        path: savedFiles.path,
        url: fileUrl,
        type: fileType,
        returnData: { ...savedFiles },
      }
    }
    return media
  } catch (error) {
    console.error('Error reading media:', error)
  }
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
