export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      auth_nonces: {
        Row: {
          expiration: string
          id: number
          nonce: string
        }
        Insert: {
          expiration?: string
          id?: number
          nonce: string
        }
        Update: {
          expiration?: string
          id?: number
          nonce?: string
        }
        Relationships: []
      }
      FavoriteProjects: {
        Row: {
          id: number
          projectId: number
          wallet_address: string
        }
        Insert: {
          id?: number
          projectId: number
          wallet_address: string
        }
        Update: {
          id?: number
          projectId?: number
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "FavoriteProjects_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          }
        ]
      }
      MarketplaceListings: {
        Row: {
          amount: string
          id: number
          listingExpiration: string
          pricePerUnit: number
          projectId: number | null
        }
        Insert: {
          amount: string
          id: number
          listingExpiration: string
          pricePerUnit: number
          projectId?: number | null
        }
        Update: {
          amount?: string
          id?: number
          listingExpiration?: string
          pricePerUnit?: number
          projectId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "MarketplaceListings_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          }
        ]
      }
      ProjectDevelopers: {
        Row: {
          id: number
          Links: string[]
          Name: string
        }
        Insert: {
          id?: number
          Links: string[]
          Name: string
        }
        Update: {
          id?: number
          Links?: string[]
          Name?: string
        }
        Relationships: []
      }
      Projects: {
        Row: {
          analysis: Database["public"]["CompositeTypes"]["swot_analysis"] | null
          assetClass: Database["public"]["Enums"]["assetclass"]
          attachmentUrls: string[]
          capitalStructure:
            | Database["public"]["CompositeTypes"]["capital_structure_item"][]
            | null
          colorCodeHex: string
          crowdfundedAmount: number
          crowdfundingDeadline: string
          crowdfundingTarget: number
          details: string
          executiveSummary: string
          financingDetails: string
          id: number
          images: string[]
          investmentType: Database["public"]["Enums"]["investmenttype"]
          loanDeadline: string
          location: unknown | null
          ProjectDeveloperId: number
          refractoRating:
            | Database["public"]["CompositeTypes"]["refracto_rating_item"][]
            | null
          returnPercentage: number
          RiskRatingLevel: Database["public"]["Enums"]["riskratinglevel"]
          shortDescription: string
          sponsorInfo: string
          thumbnailSrc: string
          title: string
        }
        Insert: {
          analysis?:
            | Database["public"]["CompositeTypes"]["swot_analysis"]
            | null
          assetClass: Database["public"]["Enums"]["assetclass"]
          attachmentUrls: string[]
          capitalStructure?:
            | Database["public"]["CompositeTypes"]["capital_structure_item"][]
            | null
          colorCodeHex: string
          crowdfundedAmount: number
          crowdfundingDeadline: string
          crowdfundingTarget: number
          details: string
          executiveSummary: string
          financingDetails: string
          id?: number
          images: string[]
          investmentType: Database["public"]["Enums"]["investmenttype"]
          loanDeadline: string
          location?: unknown | null
          ProjectDeveloperId: number
          refractoRating?:
            | Database["public"]["CompositeTypes"]["refracto_rating_item"][]
            | null
          returnPercentage: number
          RiskRatingLevel?: Database["public"]["Enums"]["riskratinglevel"]
          shortDescription: string
          sponsorInfo: string
          thumbnailSrc: string
          title: string
        }
        Update: {
          analysis?:
            | Database["public"]["CompositeTypes"]["swot_analysis"]
            | null
          assetClass?: Database["public"]["Enums"]["assetclass"]
          attachmentUrls?: string[]
          capitalStructure?:
            | Database["public"]["CompositeTypes"]["capital_structure_item"][]
            | null
          colorCodeHex?: string
          crowdfundedAmount?: number
          crowdfundingDeadline?: string
          crowdfundingTarget?: number
          details?: string
          executiveSummary?: string
          financingDetails?: string
          id?: number
          images?: string[]
          investmentType?: Database["public"]["Enums"]["investmenttype"]
          loanDeadline?: string
          location?: unknown | null
          ProjectDeveloperId?: number
          refractoRating?:
            | Database["public"]["CompositeTypes"]["refracto_rating_item"][]
            | null
          returnPercentage?: number
          RiskRatingLevel?: Database["public"]["Enums"]["riskratinglevel"]
          shortDescription?: string
          sponsorInfo?: string
          thumbnailSrc?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Projects_ProjectDeveloperId_fkey"
            columns: ["ProjectDeveloperId"]
            referencedRelation: "ProjectDevelopers"
            referencedColumns: ["id"]
          }
        ]
      }
      QandAs: {
        Row: {
          createdAt: string
          id: number
          isPendingModeration: boolean | null
          ownerAddress: string | null
          parentId: number | null
          value: string
        }
        Insert: {
          createdAt?: string
          id: number
          isPendingModeration?: boolean | null
          ownerAddress?: string | null
          parentId?: number | null
          value: string
        }
        Update: {
          createdAt?: string
          id?: number
          isPendingModeration?: boolean | null
          ownerAddress?: string | null
          parentId?: number | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "QandAs_parentId_fkey"
            columns: ["parentId"]
            referencedRelation: "QandAs"
            referencedColumns: ["id"]
          }
        ]
      }
      repaymentSchedules: {
        Row: {
          date: string
          id: number
          interestAmount: number
          lateFees: number
          paymentStatus: Database["public"]["Enums"]["paymentstatuses"]
          principalAmount: number
          projectid: number | null
        }
        Insert: {
          date: string
          id: number
          interestAmount: number
          lateFees: number
          paymentStatus: Database["public"]["Enums"]["paymentstatuses"]
          principalAmount: number
          projectid?: number | null
        }
        Update: {
          date?: string
          id?: number
          interestAmount?: number
          lateFees?: number
          paymentStatus?: Database["public"]["Enums"]["paymentstatuses"]
          principalAmount?: number
          projectid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "repaymentSchedules_projectid_fkey"
            columns: ["projectid"]
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_favorite_project: {
        Args: {
          wallet: string
          proj_id: number
        }
        Returns: undefined
      }
      check_nonce_string:
        | {
            Args: {
              input_nonce: string
            }
            Returns: boolean
          }
        | {
            Args: {
              input_address: string
              input_hashed_message: string
            }
            Returns: boolean
          }
      generate_nonce_string:
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: {
              address: string
            }
            Returns: string
          }
      get_favorite_projects: {
        Args: {
          p_wallet_address: string
        }
        Returns: {
          projectid: number
          returnpercentage: number
          crowdfundingdeadline: string
          thumbnailsrc: string
          projecttitle: string
        }[]
      }
      get_project_details_by_id: {
        Args: {
          p_id: number
        }
        Returns: {
          id: number
          title: string
          returnpercentage: number
          riskratinglevel: Database["public"]["Enums"]["riskratinglevel"]
          crowdfundingdeadline: string
          crowdfundingtarget: number
          crowdfundedamount: number
          colorcodehex: string
          thumbnailsrc: string
          loandeadline: string
          images: string[]
          projectdeveloperid: number
          assetclass: Database["public"]["Enums"]["assetclass"]
          investmenttype: Database["public"]["Enums"]["investmenttype"]
          shortdescription: string
          executivesummary: string
          details: string
          location: unknown
          sponsorinfo: string
          analysis: Database["public"]["CompositeTypes"]["swot_analysis"]
          refractorating: Database["public"]["CompositeTypes"]["refracto_rating_item"][]
          capitalstructure: Database["public"]["CompositeTypes"]["capital_structure_item"][]
          financingdetails: string
          attachmenturls: string[]
        }[]
      }
      read_project_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          title: string
          returnpercentage: number
          riskratinglevel: Database["public"]["Enums"]["riskratinglevel"]
          crowdfundingdeadline: string
          crowdfundingtarget: number
          crowdfundedamount: number
          colorcodehex: string
          thumbnailsrc: string
        }[]
      }
      remove_favorite_project: {
        Args: {
          wallet: string
          proj_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      assetclass: "Residential" | "Industrial" | "Commercial"
      investmenteventtype: "payout" | "invest" | "deposit" | "withdraw"
      investmenttype: "Development" | "Refurbish"
      paymentstatuses: "claimed" | "expected" | "pending"
      projectstatus:
        | "planned"
        | "crowdfunding"
        | "cancelled"
        | "active"
        | "delayed"
        | "finished"
      riskratinglevel: "Low" | "Medium" | "High"
    }
    CompositeTypes: {
      capital_structure_item: {
        type: string
        source: string
        amount: number
      }
      refracto_rating_item: {
        category: string
        assessments: string
      }
      swot_analysis: {
        strengths: unknown
        weaknesses: unknown
        opportunities: unknown
        threats: unknown
      }
    }
  }
}
