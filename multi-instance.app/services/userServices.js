class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUser(id) {
        return this.userRepository.findById(id);
    }
}

module.exports = UserService;