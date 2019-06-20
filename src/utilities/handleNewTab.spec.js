import { handleNewTab, handleDiaryClick } from './handleNewTab';

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

describe('test handleDiaryClick', () => {
  window.open = x => x;
  it('should handleDiaryClick Quote', () => {
    const result = handleDiaryClick('12-44567878-01', 'Quote');
    expect(result);
  });

  it('should handleDiaryClick Policy', () => {
    const result = handleDiaryClick('12-44567878-01', 'Policy');
    expect(result);
  });

  it('should handleDiaryClick Agency', () => {
    const result = handleDiaryClick('12-44567878-01', 'Agency');
    expect(result);
  });

  it('should handleDiaryClick Agent', () => {
    const result = handleDiaryClick('12-44567878-01', 'Agent');
    expect(result);
  });
});

describe('test handleDiaryKeyPress', () => {
  it('should handleDiaryKeyPress Quote', () => {
    const event = {
      charCode: 13
    };
    const result = handleDiaryClick(event, '12-44567878-01', 'Quote');
    expect(result);
  });
});
