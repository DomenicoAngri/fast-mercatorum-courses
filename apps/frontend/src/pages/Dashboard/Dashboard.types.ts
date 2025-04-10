/**
 * USER PROFILE INTERFACE
 * These are the interfaces for the user profile.
 */

// Interface for the complete response.
export interface UserProfileResponseInterface {
    data?: {
        user?: UserInterface;
        enrolment?: EnrolmentInterface;
        registry?: RegistryInterface;
        multiversity_user?: MultiversityUserInterface;
        mandatory_activities?: boolean;
        optional_activities?: boolean;
        actions?: null;
        comm_token?: boolean;
    };
    code?: number;
}

// User interface - contains basic user information.
export interface UserInterface {
    user_id?: number;
    username?: string;
    email?: string;
    official_code?: string;
    language?: string;
    social_flag?: number;
    exam_fs_flag?: number;
    elaborato_flag?: number;
    offerte_flags?: string;
    flag_doc_profile?: number;
    type_enrolment?: string;
    fiscal_code?: string;
}

// Enrolment interface - contains information about the user's enrollment.
export interface EnrolmentInterface {
    official_code?: string;
    fiscal_code?: string;
    anno_accademico_immatricolazione?: string;
    anno_prima_iscrizione?: number;
    anno_attuale_iscrizione?: number;
    numero_anni_fuoricorso?: number;
    data_immatricolazione?: string;
    corso?: string;
    duration?: number;
    codice?: string;
    stato?: string;
    convenzione?: string;
    programma?: string;
    costo?: number;
    etichetta?: string;
    rate?: number;
    ecp?: string;
    vote_weighted?: string;
    riserva?: boolean;
    riserva_end?: boolean;
}

// Registry interface - contains personal information about the user.
export interface RegistryInterface {
    fiscal_code?: string;
    firstname?: string;
    lastname?: string;
    birthstate?: string;
    birthprovincia?: string;
    birthcity?: string;
    birthdate?: string;
    nationality?: string;
    gender?: string;
    phone?: string;
    cell?: string;
    residence_address?: string;
    home_address?: string;
}

// MultiversityUser interface - contains information about the multiversity platform user.
export interface MultiversityUserInterface {
    id?: number;
    firstname?: string;
    lastname?: string;
    fiscalcode?: string;
    email?: string;
    email_verified_at?: null;
    password_changed?: number;
    picture_url?: null;
    created_at?: string;
    updated_at?: string;
    deleted_at?: null;
    login_failed_counter?: number;
    name?: string;
    pivot?: {
        platform_id?: number;
        user_id?: number;
    };
}

/**
 * COURSE INTERFACE
 * These are the interfaces for the course to complete information.
 */

// Interface for the complete course to complete response.
export interface CoursesToCompleteResponseInterface {
    data?: CourseInfoToCompleteInterface[];
}

// Course to complete information interface - contains details about a specific course.
export interface CourseInfoToCompleteInterface {
    code?: string;
    title?: string;
    cfu?: number;
    tutor_name?: string;
    video_error?: number;
    progress?: number;
    completed?: boolean;
    lp_id?: CourseProgressToCompleteInterface;
}

// Course progress to complete interface - contains learning progress information.
export interface CourseProgressToCompleteInterface {
    id?: number;
    user_id?: number;
    course_code?: string;
    course_title?: string;
    lp_id?: number;
    last_item?: number;
    folder_id?: number;
    item_id?: string;
    watched_at?: string;
}

/**
 * CAREER INTERFACE
 * These are the interfaces for the career information.
 */

// Interface for the complete career response.
export interface CareerResponseInterface {
    data?: CareerDataInterface;
    code?: number;
}

// Main career data container interface.
export interface CareerDataInterface {
    abil?: CreditInfoInterface;
    conv?: CreditInfoInterface;
    master?: CreditInfoInterface;
    form?: CreditInfoInterface;
    eson?: CreditInfoInterface;
    sup?: CreditInfoInterface;
    eso?: CreditInfoInterface;
    sost?: CreditInfoInterface;
    acquired?: CreditInfoInterface;
    remaining?: CreditInfoInterface;
    required?: CreditInfoInterface;
    vote_weighted?: string;
    vote_final?: number;
    current_year?: number;
    current_year_ended?: number;
    link?: string;
    extra_acquired?: CreditInfoInterface;
    extra_remaining?: CreditInfoInterface;
    extra_required?: CreditInfoInterface;
}

// Credit information interface - used for all credit-related fields.
export interface CreditInfoInterface {
    num?: number;
    cfu?: number;
}
