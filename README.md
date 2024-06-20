# food-delivery-service

## 👋 프로젝트 소개
프로젝트명:  Express.배달
프로젝트 소개: 신속하고 정확한 음식 배달 서비스를 목표로 소비자와 사업자 모두를 만족하는 웹을 구현하였습니다.
사용자는 가게와 메뉴를 보고 배달 주문을 할 수 있으며, 사장님은 백오피스를 통해 해당 가게의 정보를 관리할 수 있습니다.

## 👩‍💻 팀 소개
팀명: 3층 아키텍처 (Node.JS 5기 3조)
팀장: 조영진
팀원: 황소은, 김노을, 노시헌, 김현지 

## 역할 분담
조영진:
메뉴 주문
메뉴 주문 취소
주문 내역 상세 조회
주문 내역 목록 조회
주문 상태 변경
장바구니 조회
장바구니에 담기
장바구니 상품 삭제

황소은: 
리뷰 생성
리뷰 수정
리뷰 목록 조회
리뷰 삭제
업장 좋아요/좋아요 취소

김노을: 
회원가입
중복 닉네임 체크
로그인
로그아웃
토큰 재발급
이메일 인증
이메일 인증번호 검증
(추가 기능)주문 상태 알림
(추가 기능)배달 상태 알림
업장 매출 기록
사업자 인증

노시헌:
업장 생성
업장 정보 수정
업장 상세 조회
업장 목록 조회
업장 삭제
(추가 기능)음식점 랭킹 조회

김현지: 
메뉴 생성
메뉴 수정
메뉴 목록 조회
메뉴 상세 조회
메뉴 삭제

## ✅ 기술 스택

<img  src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">

<img  src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

<img  src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

<img  src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

<img  src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">

<img  src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

<img  src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">

## ✅ 주요 기능
**1. 업장, 메뉴, 리뷰, 장바구니 CRUD 기능**
업장 관리(CRUD): 새로운 음식점 등록, 기존 음식점 정보 수정, 음식점 삭제, 음식점 목록 조회 기능을 통해 다양한 음식점을 어플에 등록하고 관리할 수 있습니다.
메뉴 관리(CRUD): 음식점의 새로운 메뉴 등록, 메뉴 수정, 메뉴 삭제, 메뉴 목록 조회를 할 수 있는 기능입니다.
리뷰 관리(CRUD): 음식점이나 메뉴에 대해 리뷰를 작성, 수정, 삭제할 수 있으며 다른 사용자의 리뷰를 조회할 수 있습니다. 
장바구니 관리(CRUD): 선택한 메뉴를 장바구니에 추가, 수정, 삭제할 수 있으며 장바구니 내용을 조회할 수 있는 기능입니다.

**2. 회원가입 및 로그인/로그아웃 기능**
회원가입: 개인 정보를 입력하여 가입할 수 있으며 가입 시 이메일, 비밀번호, 닉네임 등의 정보가 필요합니다.
로그인/로그아웃: 이메일과 비밀번호를 입력하여 로그인 또는 로그아웃할 수 있는 기능입니다.

**3. 중복 닉네임 체크 기능**
중복 닉네임 체크: 회원가입 시 입력한 닉네임이 이미 사용 중인지 여부를 실시간으로 확인하는 기능으로 사용자마다 고유한 닉네임을 사용할 수 있도록 합니다.

**4. 주문 내역 조회 기능**
주문 내역 조회: 사용자가 과거에 자신이 주문한 내역을 조회할 수 있어 이전 주문을 참고하거나 재주문할 때 유용한 기능입니다.

**5. 주문 상태 알림 기능**
주문 상태 알림: 사용자가 주문한 음식의 현재 상태를 실시간으로 알림 받을 수 있는 기능입니다.
주문 접수, 조리 중, 배달 중, 배달 완료 등의 상태 변경 시 사용자에게 푸시 알림 또는 문자 메시지를 통해 알려주어 이는 사용자가 주문 상태를 지속적으로 확인할 수 있습니다.


## API 명세서
https://www.notion.so/teamsparta/3-b455dc8a5f624c6dae648d810370a2b6

## ERD
https://drawsql.app/teams/-1321/diagrams/food-delivery-service
