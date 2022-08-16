import * as utils from '../util'
import { reset } from '../db/db'
import mock from 'mock-fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const testDbString = '../database.test.txt'

describe('Util tests', () => {
  function createMockUuid() {
    // Creates random unique ID for a mock object
    return uuidv4()
  }

  const projectId = createMockUuid()

  beforeEach(() => {
    mock({ [path.resolve(__dirname, testDbString)]: '' })
    reset(testDbString, projectId)
  })

  afterEach(() => {
    mock.restore()
  })

  describe('getProjects', () => {
    it('returns the projects from the db', () => {
      const projects = utils.getProjects(testDbString)
      expect(projects).toBeDefined()
      expect(projects).toHaveLength(1)
      expect(projects[0].id).toBe(projectId)
      expect(projects[0].title).toEqual('SFO Terminal 1')
      expect(projects[0].invoice.lineItems).toHaveLength(2)
      const lineItemDescriptions = projects[0].invoice.lineItems.map((item) => item.description)
      expect(lineItemDescriptions).toEqual(['Aluminum Wiring', 'Labor'])
    })
  })

  describe('getProject', () => {
    it('returns the queried project from the db', () => {
      const project = utils.getProject(testDbString, projectId)
      expect(project).toBeDefined()
      expect(project.title).toEqual('SFO Terminal 1')
      expect(project.invoice.lineItems).toHaveLength(2)
    })
  })

  describe('createProject', () => {
    it('creates a new project', () => {
      const project = utils.createProject(testDbString)
      expect(project).toBeDefined()
      expect(project.title).toEqual('')
      expect(project.invoice.lineItems).toHaveLength(1)
      expect(project.invoice.lineItems[0].description).toEqual('')
    })
  })

  describe('updateProject', () => {
    it('updates a project', () => {
      const project = utils.createProject(testDbString)
      project.title = 'SFO Terminal 2'
      utils.updateProject(testDbString, project)
      const updatedProject = utils.getProject(testDbString, project.id)
      expect(updatedProject.title).toEqual('SFO Terminal 2')
    })
  })
})
