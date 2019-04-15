import sinon from 'sinon';

import { handleNewTab, handleNewTabClick, handleKeyPress }  from './handleNewTab';

  describe('test handleNewTab', () => {
    window.open = x => x;
    it('should handle new tab for address', () => {
      const resource = {
        id: '1111',
        physicalAddress: {
          state: 'FL'
        }
      };
      const result = handleNewTab(resource, 'address');
      expect(result);
    });

    it('should handle new tab for policy', () => {
      const resource = {
        policyNumber: '12-3049586-01'
      };
      const result = handleNewTab(resource, 'policy');
      expect(result);
    });

    it('should handle new tab for quote', () => {
      const resource = {
        quoteNumber: '12-3049586-01'
      };
      const result = handleNewTab(resource, 'quote');
      expect(result);
    });

    it('should handle new tab for agency', () => {
      const resource = {
        agencyCode: '20000'
      };
      const result = handleNewTab(resource, 'agency');
      expect(result);
    });
    it('should handle new tab for agent', () => {
      const resource = {
        agencies: [{ agencyCode: '20000' }]
      };
      const result = handleNewTab(resource, 'agent');
      expect(result);
    });
    
  });

  describe('test handleNewTabClick', () => {
    window.open = x => x;
    it('should handleNewTabClick for quote', () => {
      const result = handleNewTabClick("12-44567878-01", 'Quote');
      expect(result);
    });
    it('should handleNewTabClick for Policy', () => {
      const result = handleNewTabClick("12-44567878-01", 'Policy');
      expect(result);
    });

    it('should handleNewTabClick for Agent', () => {
      const result = handleNewTabClick("60000", 'Agent');
      expect(result);
    });

    it('should handleNewTabClick for Agency', () => {
      const result = handleNewTabClick("20000", 'Agency');
      expect(result);
    });
  });

  describe('test handleKeyPress', () => {
    window.open = x => x;
    it('should handleKeyPress for event 13', () => {
      const event = {
        charCode: 13
      }
      const result = handleKeyPress(event, "12-44567878-01", 'Quote');
      expect(result);
    });
  });
  