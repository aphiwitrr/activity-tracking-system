import { api } from 'boot/axios'
import type { Student } from 'src/types/student'

export class StudentService {
  static path = '/students'

  static async getAll() {
    try {
      const res = await api.get(this.path)
      return res.data
    } catch (error) {
      console.error('Error fetching activities:', error)
      throw error
    }
  }

  static async getOne(id: string) {
    try {
      const res = await api.get(`${this.path}/${id}`)
      return res.data
    } catch (error) {
      console.error(`Error fetching student ID: ${id}`, error)
      throw error
    }
  }

  static async createOne(obj: Partial<Student>) {
    try {
      console.log('Creating student:', obj)
      const res = await api.post(this.path, obj)
      return res.status
    } catch (error) {
      console.error('Error creating student:', error)
      throw error
    }
  }

  static async updateOne(obj: Partial<Student>) {
    try {
      if (!obj.id) {
        throw new Error('Missing ID for update')
      }
      console.log('Updating student:', obj)
      const res = await api.patch(`${this.path}/${obj.id}`, obj)
      return res.status
    } catch (error) {
      console.error('Error updating student:', error)
      throw error
    }
  }

  static async removeOne(id: string) {
    try {
      const res = await api.delete(`${this.path}/${id}`)
      return res.status
    } catch (error) {
      console.error(`Error deleting student ID: ${id}`, error)
      throw error
    }
  }
}
