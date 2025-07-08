import { AEMService } from '.';
import mockServicePage from './mockServicepage.json';

// Mock do fetch global
global.fetch = jest.fn();

describe('AEMService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockServicePage)
    });
  });

  describe('getContent', () => {
    it('should fetch and format AEM content correctly', async () => {
      // Arrange
      const endpoint = 'https://example.com/api/content';

      // Act
      const result = await AEMService.getContent(endpoint);

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(endpoint, {
        next: { revalidate: 1 }
      });
      
      // Verificar se a resposta está formatada corretamente
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('sections');
      expect(Array.isArray(result.sections)).toBe(true);
      
      // Verificar se as seções obrigatórias estão presentes
      const sectionNames = result.sections.map(section => section.name);
      expect(sectionNames).toContain('header');
      expect(sectionNames).toContain('footer');
    });

    it('should handle empty or incomplete data', async () => {
      // Arrange
      const emptyData = { ':items': { root: { ':items': {} } } };
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(emptyData)
      });
      
      // Act
      const result = await AEMService.getContent('https://example.com/api/empty');
      
      // Assert
      expect(result).toHaveProperty('data', emptyData);
      expect(result).toHaveProperty('sections');
      expect(Array.isArray(result.sections)).toBe(true);
      
      // Only header and footer should be present (even if empty)
      expect(result.sections.length).toBe(2);
    });

    it('should correctly filter spacing sections', async () => {
      // Arrange
      const dataWithSpacing = {
        ':items': {
          root: {
            ':items': {
              responsivegrid: {
                ':items': {
                  'section_1': { content: 'Section 1' },
                  'spacing_1': { content: 'Spacing 1' },
                  'section_2': { content: 'Section 2' }
                }
              },
              experiencefragment: {
                ':items': {
                  root: {
                    ':items': {
                      header: { content: 'Header' }
                    }
                  }
                }
              },
              'experiencefragment-footer': {
                ':items': {
                  root: {
                    ':items': {
                      footer: { content: 'Footer' }
                    }
                  }
                }
              }
            }
          }
        }
      };
      
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(dataWithSpacing)
      });
      
      // Act
      const result = await AEMService.getContent('https://example.com/api/spacing');
      
      // Assert
      const sectionNames = result.sections.map(section => section.name);
      
      // Verificar se as seções de espaçamento foram filtradas
      expect(sectionNames).not.toContain('spacing');
      
      // Verificar se as seções normais estão presentes
      expect(sectionNames).toContain('header');
      expect(sectionNames).toContain('footer');
      // Verificar se pelo menos uma seção normal está presente
      const hasSection = sectionNames.some(name => name === 'section');
      expect(hasSection).toBe(true);
    });

    it('should remove numbers from section names', async () => {
      // Arrange
      const dataWithNumberedSections = {
        ':items': {
          root: {
            ':items': {
              responsivegrid: {
                ':items': {
                  'section_1': { content: 'Section 1' },
                  'banner_2': { content: 'Banner 2' },
                  'cards_3_': { content: 'Cards 3' }
                }
              },
              experiencefragment: {
                ':items': {
                  root: {
                    ':items': {
                      header: { content: 'Header' }
                    }
                  }
                }
              },
              'experiencefragment-footer': {
                ':items': {
                  root: {
                    ':items': {
                      footer: { content: 'Footer' }
                    }
                  }
                }
              }
            }
          }
        }
      };
      
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(dataWithNumberedSections)
      });
      
      // Act
      const result = await AEMService.getContent('https://example.com/api/numbered');
      
      // Assert
      const sections = result.sections.filter(section => !['header', 'footer'].includes(section.name));
      
      // Verificar se os números foram removidos dos nomes das seções
      const sectionNames = sections.map(section => section.name);
      
      // Verificar se pelo menos algumas das seções esperadas estão presentes
      const hasExpectedSections = 
        sectionNames.includes('section') || 
        sectionNames.includes('banner') || 
        sectionNames.includes('cards');
      
      expect(hasExpectedSections).toBe(true);
      
      // Verificar se não há números nos nomes das seções
      expect(sections.every(section => !/\d/.test(section.name))).toBe(true);
    });

    it('should correctly find the section-header when present', async () => {
      // Arrange
      const dataWithSectionHeader = {
        ':items': {
          root: {
            ':items': {
              responsivegrid: {
                ':items': {
                  'section_1': { content: 'Section 1' }
                }
              },
              experiencefragment: {
                ':items': {
                  root: {
                    ':items': {
                      header: { content: 'Header' }
                    }
                  }
                }
              },
              'experiencefragment-footer': {
                ':items': {
                  root: {
                    ':items': {
                      footer: { content: 'Footer' }
                    }
                  }
                }
              }
            }
          }
        },
        'section-header': {
          ':type': 'porto/react-components/section-header',
          content: 'Section Header Content'
        }
      };
      
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(dataWithSectionHeader)
      });
      
      // Act
      const result = await AEMService.getContent('https://example.com/api/section-header');
      
      // Assert
      const sectionNames = result.sections.map(section => section.name);
      
      // Verificar se o section-header foi encontrado e incluído
      expect(sectionNames).toContain('section-header');
    });
  });
});
