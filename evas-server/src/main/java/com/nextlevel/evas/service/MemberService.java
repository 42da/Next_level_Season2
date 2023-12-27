package com.nextlevel.evas.service;

import java.util.List;
import java.util.Optional;
import com.nextlevel.evas.domain.Member;
import com.nextlevel.evas.repository.MemberRepository;
import com.nextlevel.evas.repository.MemoryMemberRepository;

public class MemberService {

  private final MemberRepository memberRepository = new MemoryMemberRepository();

  // 회원 가입
  public Long join(Member member) {
    // 같은 이름이 있는 중복 회원 x
    validateDuplicateMember(member); // 중복 회원 검증

    memberRepository.save(member);

    return member.getId();
  }

  private void validateDuplicateMember(Member member) {
    memberRepository.findByName(member.getName())
    .ifPresent(m -> {
      throw new IllegalStateException("이미 존재하는 회원입니다.");
    });
  }

  // 전체 회원 조회
  public List<Member> findMembers() {
    return memberRepository.findAll();
  }

  public Optional<Member> findOne(Long memberId) {
    return memberRepository.findById(memberId);
  }

}
