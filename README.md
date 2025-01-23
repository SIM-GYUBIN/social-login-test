# social-login-test
카카오 구글 소셜 로그인 동작 여부 확인해주는


- vue/@cli 이므로 `npm install` 후 `npm run serve`로 시작
- components에서 각 소셜로그인 제공자 키 넣을 것

적용된 예시 api 명세

### 소셜 인증
- **URL**: `/api/oauth/{provider}`
- **Method**: `POST`
- **Auth**: `Not Required`
- **Path Variables**:
    - `provider`: string (kakao | google)
- **Request Body**:

```json
{
    "code": "string"  // OAuth 인증 코드
}
```

- **Response**: `200 Ok`

```json
{
    "success": true,
    "data": {
	        "accessToken": "string",
	        "refreshToken": "string"
	        "user": {
			        "id" : "string",
			        "nickname": "string"
			        "isNew": "boolean" // 로그인 시 신규 회원 여부			     
	        }
		}
		"error": null
}
```


### 정보 조회회
- **URL**: `/api/user/me`
- **Method**: `GET`
- **Auth**: `Required`
- **Headers**:
    - Authorization: `Bearer {JWT_TOKEN}`

- **Response**: `200 Ok`

```json
{
    "success": true,
    "data": {
			"id" : "string",
			"nickname": "string",
            "totalLikes": "integer"
		},
	"error": null
}
```