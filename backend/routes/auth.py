from fastapi import APIRouter
from controllers.auth import signup_controller, login_controller

router = APIRouter(tags=["auth"])

# @router.post("/signup")
# def signup(request: SignupRequest):
#     return signup_controller(request)

# @router.post("/login")
# def login(request: LoginRequest):
#     return login_controller(request)

router.add_api_route("/signup", signup_controller, methods=["POST"])
router.add_api_route("/login", login_controller, methods=["POST"])