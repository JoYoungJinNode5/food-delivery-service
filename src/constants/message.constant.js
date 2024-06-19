import { MIN_PASSWORD_LENGTH, MIN_RESUME_LENGTH } from './auth.constant.js';

export const MESSAGES = {
  AUTH: {
    COMMON: {
      EMAIL: {
        REQUIRED: '이메일을 입력해 주세요.',
        INVALID_FORMAT: '이메일 형식이 올바르지 않습니다.',
        DUPLICATED: '이미 가입 된 사용자입니다.',
        TRANSFER_FAILED: '인증번호 전송에 실패했습니다.',
        TRANSFER_SUCCEED: '인증번호 전송에 성공했습니다.',
        NOT_MACHTED_TRANSFER: '인증번호가 일치하지 않습니다.',
        SUCCEED: '이메일 인증에 성공했습니다.',
      },
      PASSWORD: {
        REQURIED: '비밀번호를 입력해 주세요.',
        MIN_LENGTH: `비밀번호는 ${MIN_PASSWORD_LENGTH}자리 이상이어야 합니다.`,
      },
      PASSWORD_CONFIRM: {
        REQURIED: '비밀번호 확인을 입력해 주세요.',
        NOT_MACHTED_WITH_PASSWORD: '입력 한 두 비밀번호가 일치하지 않습니다.',
      },
      NAME: {
        REQURIED: '이름을 입력해 주세요.',
      },
      NICKNAME: {
        DUPLICATED: '이미 존재하는 닉네임입니다.',
        SUCCEED: '사용 가능한 닉네임입니다.',
      },
      UNAUTHORIZED: '인증 정보가 유효하지 않습니다.',
      FORBIDDEN: '접근 권한이 없습니다.',
      JWT: {
        NO_TOKEN: '인증 정보가 없습니다.',
        NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
        EXPIRED: '인증 정보가 만료되었습니다.',
        NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
        INVALID: '인증 정보가 유효하지 않습니다.',
        DISCARDED_TOKEN: '폐기 된 인증 정보입니다.',
      },
    },
    SIGN_UP: {
      SUCCEED: '회원가입에 성공했습니다.',
    },
    SIGN_IN: {
      SUCCEED: '로그인에 성공했습니다.',
    },
    SIGN_OUT: {
      SUCCEED: '로그아웃에 성공했습니다.',
    },
    TOKEN: {
      SUCCEED: '토큰 재발급에 성공했습니다.',
    },
  },
  USERS: {
    READ_ME: {
      SUCCEED: '내 정보 조회에 성공했습니다.',
    },
  },
  RESUMES: {
    COMMON: {
      TITLE: {
        REQUIRED: '제목을 입력해 주세요.',
      },
      CONTENT: {
        REQUIRED: '자기소개를 입력해 주세요.',
        // MIN_LENGTH: `자기소개는 ${MIN_RESUME_LENGTH}자 이상 작성해야 합니다.`,
      },
      NOT_FOUND: '이력서가 존재하지 않습니다.',
    },
    CREATE: {
      SUCCEED: '이력서 생성에 성공했습니다.',
    },
    READ_LIST: {
      SUCCEED: '이력서 목록 조회에 성공했습니다.',
    },
    READ_DETAIL: {
      SUCCEED: '이력서 상세 조회에 성공했습니다.',
    },
    UPDATE: {
      SUCCEED: '이력서 수정에 성공했습니다.',
      NO_BODY_DATA: '수정 할 정보를 입력해 주세요.',
    },
    DELETE: {
      SUCCEED: '이력서 삭제에 성공했습니다.',
    },
  },
  ORDER: {
    COMMON: {
      NOT_FOUND: '주문이 존재하지 않습니다.',
    },
  },
  REVIEW: {
    COMMON: {
      RATING: {
        REQUIRED: '별점을 입력해 주세요.',
      },
      ORDER: {
        REQUIRED: '주문 기록이 존재하지 않습니다.',
      },
      NOT_FOUND: '리뷰가 존재하지 않습니다.',
    },
    CREATE: {
      SUCCEED: '리뷰 작성에 성공했습니다.',
    },
    UPDATE: {
      SUCCEED: '리뷰 수정에 성공했습니다.',
    },
    READ_LIST: {
      SUCCEED: '리뷰 목록 조회에 성공했습니다.',
    },
    DELETE: {
      SUCCEED: '리뷰 삭제에 성공했습니다.',
    },
  },
  FILE: {
    INVALID_FORMAT: '사진 파일은 .jpg, .jpeg, .png, .gif 만 가능합니다.',
  },
};
