
const API_BASE_URL = 'http://localhost:5000/api/resumes'


export async function getResumesFromApi() {
    try {
        const response = await fetch(API_BASE_URL)
        if (!response.ok) throw new Error('Error al obtener los currículums')
        return await response.json()
    } catch (error) {
        console.warn('Backend C# no disponible, usando almacenamiento local:', error.message)
        return null
    }
}


export async function saveResumeToApi(resume) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resume)
        })
        if (!response.ok) throw new Error('Error al guardar el currículum')
        return await response.json()
    } catch (error) {
        console.warn('No se pudo guardar en backend C#:', error.message)
        return null
    }
}


export async function deleteResumeFromApi(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        })
        return response.ok
    } catch (error) {
        console.warn('No se pudo eliminar en backend C#:', error.message)
        return false
    }
}

