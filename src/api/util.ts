import { all, findOne, insert, update } from './db/db'
import { Project } from './types'
import { v4 as uuidv4 } from 'uuid'

/** Returns a list of all projects in the database */
export function getProjects(dbString: string): Project[] {
  return all(dbString, 'projects')
}

/** Returns a single project from the database */
export function getProject(dbString: string, id: string): Project {
  return findOne(dbString, 'projects', id)
}

/** Create a project in the database */
export function createProject(dbString: string): Project {
  const project: Project = {
    id: uuidv4(),
    title: '',
    invoice: {
      id: uuidv4(),
      // Initialize the project with a single empty line item
      lineItems: [{ id: uuidv4(), description: '', amount: 0 }],
    },
  }
  insert(dbString, 'projects', project)
  return project
}

/** Update a project in the database */
export function updateProject(dbString: string, project: Project): Project {
  update(dbString, 'projects', project.id, project)
  return findOne(dbString, 'projects', project.id)
}
