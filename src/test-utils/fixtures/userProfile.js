export default {
  userId: 'auth0|5cace111965e901112a8515b',
  userName: 'af3beta',
  email: 'relkins_exzeo@gmail.com',
  profile: {
    groups: [
      {
        name: 'TTICCSR',
        agencyCode: '',
        companyCode: 'TTIC',
        state: 'FL',
        isCSR: true,
        isAgency: false,
        extendedProperties: {
          isAgency: false,
          isCSR: true,
          agencyId: '',
          agencyCode: '',
          state: 'FL',
          companyCode: 'TTIC',
          harmonyGroup: true
        },
        roles: [],
        childGroups: [],
        __v: 0
      }
    ],
    given_name: 'AF3',
    family_name: 'Beta'
  },
  resources: [
    {
      right: 'READ',
      uri: 'PolicyData:Transactions:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:PolicyData:Transactions:*'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:PolicyData:Transactions:*'
    },
    {
      right: 'INSERT',
      uri: 'PolicyData:Transactions:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:HO3:PolicyData:Transactions:*'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:PremiumEndorse',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:PolicyData:PremiumEndorse'
    },
    {
      right: 'READ',
      uri: 'QuoteData:Quotes:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:QuoteData:Quotes:*'
    },
    {
      right: 'READ',
      uri: 'Quotes:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:Quotes:*'
    },
    {
      right: 'INSERT',
      uri: 'QuoteData:Quotes:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:HO3:QuoteData:Quotes:*'
    },
    {
      right: 'UPDATE',
      uri: 'QuoteData:Quotes:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:QuoteData:Quotes:*'
    },
    {
      right: 'UPDATE',
      uri: 'Quotes:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:Quotes:*'
    },
    {
      right: 'INSERT',
      uri: 'Quotes:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:HO3:Quotes:*'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:PolicyHolders:LastName',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:PolicyData:Transactions:PolicyHolders:LastName'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:PolicyHolders:FirstName',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:PolicyData:Transactions:PolicyHolders:FirstName'
    },
    {
      right: 'READ',
      uri: 'Billing:Payments:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:Billing:Payments:*'
    },
    {
      right: 'READ',
      uri: 'Payment:Payments:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:Payment:Payments:*'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:TransactionType:EffectiveDateChange',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:EffectiveDateChange'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:Property',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:PolicyData:Transactions:Property'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:TransactionType:Endorsement',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:Endorsement'
    },
    {
      right: 'READ',
      uri: 'Diaries:DiariesService:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:Diaries:DiariesService:*'
    },
    {
      right: 'INSERT',
      uri: 'Diaries:DiariesService:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:HO3:Diaries:DiariesService:*'
    },
    {
      right: 'UPDATE',
      uri: 'Diaries:DiariesService:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:Diaries:DiariesService:*'
    },
    {
      right: 'READ',
      uri: 'Agency:Agencies:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:Agency:Agencies:*'
    },
    {
      right: 'READ',
      uri: 'Agency:Agents:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:Agency:Agents:*'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:TransactionType:UnderwritingCancellation',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:UnderwritingCancellation'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:TransactionType:UnderwritingNonRenewal',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:UnderwritingNonRenewal'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:TransactionType:VoluntaryCancellation',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:VoluntaryCancellation'
    },
    {
      right: 'READ',
      uri: 'BillingData:FinancialTransactions:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:BillingData:FinancialTransactions:*'
    },
    {
      right: 'INSERT',
      uri: 'BillingData:FinancialTransactions:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:HO3:BillingData:FinancialTransactions:*'
    },
    {
      right: 'UPDATE',
      uri: 'BillingData:FinancialTransactions:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:BillingData:FinancialTransactions:*'
    },
    {
      right: 'READ',
      uri: 'SummaryLedger:summaryledgers:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:SummaryLedger:summaryledgers:*'
    },
    {
      right: 'INSERT',
      uri: 'SummaryLedger:summaryledgers:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:HO3:SummaryLedger:summaryledgers:*'
    },
    {
      right: 'UPDATE',
      uri: 'SummaryLedger:summaryledgers:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:HO3:SummaryLedger:summaryledgers:*'
    },
    {
      right: 'UPDATE',
      uri: 'PolicyData:Transactions:TransactionType:WindMitigationEndorsement',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:WindMitigationEndorsement'
    },
    {
      right: 'READ',
      uri: 'Renewal:PendingRenewals:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:Renewal:PendingRenewals:*'
    },
    {
      right: 'READ',
      uri: 'DocumentConfiguration:ConfigurationValues:*',
      conditions: [
        {
          csp: 'TTIC:FL:HO3'
        },
        {
          csp: 'TTIC:FL:AF3'
        }
      ]
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:HO3:DocumentConfiguration:ConfigurationValues:*'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:PolicyData:Transactions:*'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:PolicyData:Transactions:*'
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:AF3:PolicyData:Transactions:*'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:PolicyData:PremiumEndorse'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:QuoteData:Quotes:*'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:Quotes:*'
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:AF3:QuoteData:Quotes:*'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:QuoteData:Quotes:*'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:Quotes:*'
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:AF3:Quotes:*'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:PolicyData:Transactions:PolicyHolders:LastName'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:PolicyData:Transactions:PolicyHolders:FirstName'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:Billing:Payments:*'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:Payment:Payments:*'
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:EffectiveDateChange'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:PolicyData:Transactions:Property'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:Endorsement'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:Diaries:DiariesService:*'
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:AF3:Diaries:DiariesService:*'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:Diaries:DiariesService:*'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:Agency:Agencies:*'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:Agency:Agents:*'
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:UnderwritingCancellation'
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:UnderwritingNonRenewal'
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:VoluntaryCancellation'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:BillingData:FinancialTransactions:*'
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:AF3:BillingData:FinancialTransactions:*'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:BillingData:FinancialTransactions:*'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:SummaryLedger:summaryledgers:*'
    },
    {
      right: 'INSERT',
      uri: 'TTIC:FL:AF3:SummaryLedger:summaryledgers:*'
    },
    {
      right: 'UPDATE',
      uri: 'TTIC:FL:AF3:SummaryLedger:summaryledgers:*'
    },
    {
      right: 'UPDATE',
      uri:
        'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:WindMitigationEndorsement'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:Renewal:PendingRenewals:*'
    },
    {
      right: 'READ',
      uri: 'TTIC:FL:AF3:DocumentConfiguration:ConfigurationValues:*'
    }
  ],
  enabled: true,
  authorizedApplications: []
};
