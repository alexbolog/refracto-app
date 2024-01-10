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
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          }
        ]
      }
      processed_transactions: {
        Row: {
          amount: number | null
          created_at: string
          function: string
          id: number
          project_id: number | null
          sender: string
          status: string
          transfer_token: string | null
          tx_hash: string
          tx_timestamp: number
        }
        Insert: {
          amount?: number | null
          created_at?: string
          function: string
          id?: number
          project_id?: number | null
          sender: string
          status: string
          transfer_token?: string | null
          tx_hash: string
          tx_timestamp: number
        }
        Update: {
          amount?: number | null
          created_at?: string
          function?: string
          id?: number
          project_id?: number | null
          sender?: string
          status?: string
          transfer_token?: string | null
          tx_hash?: string
          tx_timestamp?: number
        }
        Relationships: [
          {
            foreignKeyName: "processed_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
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
          holders: number
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
          shareTokenNonce: number
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
          holders?: number
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
          shareTokenNonce?: number
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
          holders?: number
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
          shareTokenNonce?: number
          shortDescription?: string
          sponsorInfo?: string
          thumbnailSrc?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Projects_ProjectDeveloperId_fkey"
            columns: ["ProjectDeveloperId"]
            isOneToOne: false
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
            isOneToOne: false
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
            isOneToOne: false
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
      add_processed_transactions: {
        Args: {
          transactions: Json
        }
        Returns: undefined
      }
      check_nonce_string:
        | {
            Args: {
              input_address: string
              input_hashed_message: string
            }
            Returns: boolean
          }
        | {
            Args: {
              input_nonce: string
            }
            Returns: boolean
          }
      extract_email_from_jwt: {
        Args: Record<PropertyKey, never>
        Returns: string
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
      get_last_processed_tx_timestamp: {
        Args: Record<PropertyKey, never>
        Returns: string
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
          sharetokennonce: number
        }[]
      }
      get_unprocessed_transaction_hashes: {
        Args: {
          tx_hashes: Json
        }
        Returns: {
          tx_hash: string
        }[]
      }
      get_user_transactions: {
        Args: {
          function_filter: string
        }
        Returns: {
          id: number
          created_at: string
          tx_hash: string
          sender: string
          function: string
          tx_timestamp: number
          amount: number
          transfer_token: string
          project_id: number
          status: string
          project_title: string
        }[]
      }
      insert_project:
        | {
            Args: {
              p_title: string
              p_return_percentage: number
              p_crowdfunding_deadline: string
              p_crowdfunding_target: number
              p_crowdfunded_amount: number
              p_color_code_hex: string
              p_thumbnail_src: string
              p_loan_deadline: string
              p_images: string[]
              p_project_developer_id: number
              p_risk_rating_level: Database["public"]["Enums"]["riskratinglevel"]
              p_asset_class: Database["public"]["Enums"]["assetclass"]
              p_investment_type: Database["public"]["Enums"]["investmenttype"]
              p_short_description: string
              p_executive_summary: string
              p_details: string
              p_location: unknown
              p_sponsor_info: string
              p_refracto_rating: Database["public"]["CompositeTypes"]["refracto_rating_item"][]
              p_capital_structure: Database["public"]["CompositeTypes"]["capital_structure_item"][]
              p_financing_details: string
              p_attachment_urls: string[]
            }
            Returns: number
          }
        | {
            Args: {
              p_title: string
              p_return_percentage: number
              p_crowdfunding_deadline: string
              p_crowdfunding_target: number
              p_crowdfunded_amount: number
              p_color_code_hex: string
              p_thumbnail_src: string
              p_loan_deadline: string
              p_images: string[]
              p_project_developer_id: number
              p_risk_rating_level: Database["public"]["Enums"]["riskratinglevel"]
              p_asset_class: Database["public"]["Enums"]["assetclass"]
              p_investment_type: Database["public"]["Enums"]["investmenttype"]
              p_short_description: string
              p_executive_summary: string
              p_details: string
              p_location: unknown
              p_sponsor_info: string
              p_refracto_rating: Database["public"]["CompositeTypes"]["refracto_rating_item"][]
              p_capital_structure: Database["public"]["CompositeTypes"]["capital_structure_item"][]
              p_financing_details: string
              p_attachment_urls: string[]
              p_analysis: Database["public"]["CompositeTypes"]["swot_analysis"]
            }
            Returns: number
          }
      read_project_data:
        | {
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
              sharetokennonce: number
              holders: number
            }[]
          }
        | {
            Args: {
              _include_invalid_nonce: boolean
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
              sharetokennonce: number
            }[]
          }
      read_update_project_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
        }[]
      }
      remove_favorite_project: {
        Args: {
          wallet: string
          proj_id: number
        }
        Returns: undefined
      }
      update_project_sc_data: {
        Args: {
          _projectid: number
          _amount: number
          _holderscount: number
          _sharetokennonce: number
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
