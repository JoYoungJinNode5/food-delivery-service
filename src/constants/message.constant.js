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
  MENU: {
    CREATE: {
      SUCCEED: '메뉴가 성공적으로 생성되었습니다.',
    },
    UPDATE: {
      SUCCEED: '메뉴가 성공적으로 수정되었습니다.',
    },
    READ_DETAIL: {
      SUCCEED: '메뉴 상세 조회에 성공했습니다.',
    },
    READ_LIST: {
      SUCCEED: '메뉴 목록 조회에 성공했습니다.',
    },
    DELETE: {
      SUCCEED: '메뉴가 성공적으로 삭제되었습니다.',
    },
  },

  ORDERS: {
    CREATE: {
      SUCCEED: '주문 생성에 성공했습니다.',
    },
    CANCEL: {
      SUCCEED: '주문 취소에 성공했습니다.',
    },
    READ_DETAIL: {
      SUCCEED: '주문 상세 조회에 성공했습니다.',
    },
    READ_LIST: {
      SUCCEED: '주문 목록 조회에 성공했습니다.',
    },
    UPDATE: {
      SUCCEED: '주문 상태 변경에 성공했습니다.',
    },
    INSUFFICIENT_POINTS: '포인트가 부족합니다.',
    INVALID_MENU_ITEM: '유효하지 않은 메뉴 항목입니다.',
    INVALID_MENU_QUANTITY: '메뉴 항목과 수량이 일치하지 않습니다.',
  },

  CART: {
    CREATE: {
      SUCCEED: '장바구니 항목이 성공적으로 추가되었습니다.',
    },
    READ: {
      SUCCEED: '장바구니 항목 조회에 성공했습니다.',
    },
    DELETE: {
      SUCCEED: '장바구니 항목 삭제에 성공했습니다.',
    },
    EMPTY: '장바구니가 비어 있습니다.',
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
  RESTAURANT: {
    COMMON: {
      NAME: {
        REQUIRED: '업장 이름을 입력해 주세요.',
      },
      CATEGORY: {
        REQUIRED: '업장 카테고리를 입력해 주세요.',
      },
      ADDRESS: {
        REQUIRED: '업장 주소를 입력해 주세요.',
      },
      CONTENT: {
        REQUIRED: '업장 설명을 입력해 주세요.',
      },
      NOT_FOUND: '존재하지 않는 업장입니다.',
    },
    CREATE: {
      SUCCEED: '업장 생성에 성공했습니다.',
      MULTI_NOT_ALLOW: '업장은 하나만 가질 수 있습니다.',
    },
    READ: {
      SUCCEED: '업장 조회에 성공했습니다.',
    },
    READ_DETAIL: {
      SUCCEED: '업장 상세 조회에 성공했습니다.',
    },
    READ_KEYWORD: {
      SUCCEED: '키워드 기반 업장 조회에 성공했습니다.',
    },
    UPDATE: {
      STATUS: {
        NO_BODY_DATA: '수정할 정보을 입력해주세요.',
      },
      SUCCEED: '업장 수정에 성공했습니다.',
    },
    DELETE: {
      SUCCEED: '업장 삭제에 성공했습니다.',
    },
  },
  LIKES: {
    COMMON: {
      ACTION: {
        INVALID_FORMAT: '유효하지 않은 형식입니다.',
        REQUIRED: '좋아요/좋아요 취소 등 값을 입력해주세요.',
      },
    },
    LIKE: {
      SUCCEED: '좋아요에 등록에 성공했습니다.',
      DUPLICATED: '이미 좋아요 등록이 되어있습니다.',
    },
    UNLIKE: {
      SUCCEED: '좋아요 취소에 성공했습니다.',
    },
  },
};
